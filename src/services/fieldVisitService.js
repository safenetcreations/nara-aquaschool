// Field Visit Booking Service with School Integration
import { 
  collection, 
  doc, 
  addDoc,
  getDocs, 
  getDoc, 
  updateDoc,
  deleteDoc,
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { incrementFieldVisitBookings } from './schoolService';

// ==================== FIELD VISIT LOCATIONS ====================

export const FIELD_VISIT_LOCATIONS = [
  {
    id: 'nara-colombo',
    name: 'NARA Head Office - Colombo',
    type: 'Research Facility',
    address: 'Crow Island, Colombo 15',
    capacity: 50,
    duration: '3 hours',
    facilities: ['Research Labs', 'Marine Museum', 'Library', 'Aquarium'],
    grades: '5-13',
    image: '/images/locations/nara-colombo.jpg',
    description: 'Visit our main research facility and explore marine biology labs, museum exhibits, and see live marine specimens.'
  },
  {
    id: 'marine-park-hikkaduwa',
    name: 'Hikkaduwa Marine National Park',
    type: 'Marine Park',
    address: 'Hikkaduwa, Galle',
    capacity: 40,
    duration: '4 hours',
    facilities: ['Snorkeling', 'Glass Bottom Boat', 'Beach Activities', 'Guided Tour'],
    grades: '5-13',
    image: '/images/locations/hikkaduwa.jpg',
    description: 'Experience coral reefs, sea turtles, and diverse marine life in this protected marine sanctuary.'
  },
  {
    id: 'pigeon-island',
    name: 'Pigeon Island National Park',
    type: 'Marine Park',
    address: 'Nilaveli, Trincomalee',
    capacity: 35,
    duration: '5 hours',
    facilities: ['Snorkeling', 'Coral Viewing', 'Bird Watching', 'Picnic Area'],
    grades: '8-13',
    image: '/images/locations/pigeon-island.jpg',
    description: 'Discover pristine coral reefs and unique bird species in this beautiful island sanctuary.'
  },
  {
    id: 'national-aquarium',
    name: 'National Aquarium - Colombo',
    type: 'Aquarium',
    address: 'Bolgoda Road, Dehiwala',
    capacity: 60,
    duration: '2 hours',
    facilities: ['Indoor Exhibits', 'Touch Tank', 'Theater', 'Gift Shop'],
    grades: '5-10',
    image: '/images/locations/aquarium.jpg',
    description: 'See diverse marine species from Sri Lankan waters and around the world in our modern aquarium.'
  },
  {
    id: 'mangrove-museum',
    name: 'Mangrove Museum - Pambala',
    type: 'Museum',
    address: 'Pambala, Chilaw',
    capacity: 45,
    duration: '3 hours',
    facilities: ['Museum', 'Boardwalk', 'Mangrove Forest', 'Bird Hide'],
    grades: '5-13',
    image: '/images/locations/mangrove.jpg',
    description: 'Learn about mangrove ecosystems and their importance to coastal protection and marine life.'
  }
];

// ==================== CREATE BOOKING ====================

/**
 * Create a field visit booking
 */
export const createFieldVisitBooking = async (bookingData) => {
  try {
    const booking = {
      ...bookingData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'fieldVisitBookings'), booking);
    
    // Increment school's field visit count
    if (bookingData.schoolId) {
      await incrementFieldVisitBookings(bookingData.schoolId);
    }

    return {
      success: true,
      bookingId: docRef.id,
      message: 'Field visit booking created successfully'
    };
  } catch (error) {
    console.error('Error creating field visit booking:', error);
    throw error;
  }
};

/**
 * Book a field visit with full details
 */
export const bookFieldVisit = async ({
  locationId,
  schoolId,
  schoolName,
  teacherId,
  teacherName,
  teacherEmail,
  teacherPhone,
  grade,
  numberOfStudents,
  preferredDate,
  alternateDate,
  specialRequirements,
  transportArrangement
}) => {
  try {
    // Validate location
    const location = FIELD_VISIT_LOCATIONS.find(l => l.id === locationId);
    if (!location) {
      throw new Error('Invalid location selected');
    }

    // Check capacity
    if (numberOfStudents > location.capacity) {
      throw new Error(`Number of students (${numberOfStudents}) exceeds location capacity (${location.capacity})`);
    }

    const bookingData = {
      locationId,
      locationName: location.name,
      schoolId,
      schoolName,
      teacherId,
      teacherName,
      teacherEmail,
      teacherPhone,
      grade,
      numberOfStudents,
      preferredDate: new Date(preferredDate).toISOString(),
      alternateDate: alternateDate ? new Date(alternateDate).toISOString() : null,
      specialRequirements: specialRequirements || '',
      transportArrangement: transportArrangement || 'school_bus',
      status: 'pending',
      approvedBy: null,
      approvedAt: null,
      confirmedDate: null,
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await createFieldVisitBooking(bookingData);
  } catch (error) {
    console.error('Error booking field visit:', error);
    throw error;
  }
};

// ==================== GET BOOKINGS ====================

/**
 * Get all bookings (admin use)
 */
export const getAllBookings = async () => {
  try {
    const bookingsRef = collection(db, 'fieldVisitBookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting all bookings:', error);
    throw error;
  }
};

/**
 * Get bookings by school
 */
export const getBookingsBySchool = async (schoolId) => {
  try {
    const bookingsRef = collection(db, 'fieldVisitBookings');
    const q = query(
      bookingsRef, 
      where('schoolId', '==', schoolId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by school:', error);
    throw error;
  }
};

/**
 * Get bookings by teacher
 */
export const getBookingsByTeacher = async (teacherId) => {
  try {
    const bookingsRef = collection(db, 'fieldVisitBookings');
    const q = query(
      bookingsRef, 
      where('teacherId', '==', teacherId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by teacher:', error);
    throw error;
  }
};

/**
 * Get booking by ID
 */
export const getBookingById = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists()) {
      return {
        id: bookingDoc.id,
        ...bookingDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
};

/**
 * Get pending bookings
 */
export const getPendingBookings = async () => {
  try {
    const bookingsRef = collection(db, 'fieldVisitBookings');
    const q = query(
      bookingsRef, 
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting pending bookings:', error);
    throw error;
  }
};

// ==================== UPDATE BOOKING ====================

/**
 * Update booking status
 */
export const updateBookingStatus = async (bookingId, status, notes = '') => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    const updates = {
      status,
      notes,
      updatedAt: new Date().toISOString()
    };

    if (status === 'approved') {
      updates.approvedAt = new Date().toISOString();
    }

    await updateDoc(bookingRef, updates);
    return { success: true, message: 'Booking status updated' };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

/**
 * Approve booking
 */
export const approveBooking = async (bookingId, approvedBy, confirmedDate, notes = '') => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'approved',
      approvedBy,
      approvedAt: new Date().toISOString(),
      confirmedDate: new Date(confirmedDate).toISOString(),
      notes,
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: 'Booking approved successfully' };
  } catch (error) {
    console.error('Error approving booking:', error);
    throw error;
  }
};

/**
 * Reject booking
 */
export const rejectBooking = async (bookingId, reason) => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'rejected',
      notes: reason,
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: 'Booking rejected' };
  } catch (error) {
    console.error('Error rejecting booking:', error);
    throw error;
  }
};

/**
 * Cancel booking
 */
export const cancelBooking = async (bookingId, reason = '') => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      notes: reason,
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: 'Booking cancelled' };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

/**
 * Complete booking (after visit)
 */
export const completeBooking = async (bookingId, feedback = '') => {
  try {
    const bookingRef = doc(db, 'fieldVisitBookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'completed',
      feedback,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: 'Booking marked as completed' };
  } catch (error) {
    console.error('Error completing booking:', error);
    throw error;
  }
};

// ==================== STATISTICS ====================

/**
 * Get booking statistics
 */
export const getBookingStatistics = async () => {
  try {
    const bookings = await getAllBookings();
    
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      approved: bookings.filter(b => b.status === 'approved').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      rejected: bookings.filter(b => b.status === 'rejected').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalStudents: bookings.reduce((sum, b) => sum + (b.numberOfStudents || 0), 0),
      byLocation: {}
    };

    // Group by location
    bookings.forEach(booking => {
      if (!stats.byLocation[booking.locationId]) {
        stats.byLocation[booking.locationId] = {
          name: booking.locationName,
          count: 0,
          students: 0
        };
      }
      stats.byLocation[booking.locationId].count++;
      stats.byLocation[booking.locationId].students += booking.numberOfStudents || 0;
    });

    return stats;
  } catch (error) {
    console.error('Error getting booking statistics:', error);
    throw error;
  }
};

/**
 * Get bookings by date range
 */
export const getBookingsByDateRange = async (startDate, endDate) => {
  try {
    const bookingsRef = collection(db, 'fieldVisitBookings');
    const q = query(
      bookingsRef,
      where('preferredDate', '>=', new Date(startDate).toISOString()),
      where('preferredDate', '<=', new Date(endDate).toISOString()),
      orderBy('preferredDate', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by date range:', error);
    throw error;
  }
};

/**
 * Check availability for a date
 */
export const checkAvailability = async (locationId, date) => {
  try {
    const location = FIELD_VISIT_LOCATIONS.find(l => l.id === locationId);
    if (!location) {
      throw new Error('Invalid location');
    }

    const bookingsRef = collection(db, 'fieldVisitBookings');
    const targetDate = new Date(date).toISOString().split('T')[0];
    
    const q = query(
      bookingsRef,
      where('locationId', '==', locationId),
      where('status', 'in', ['pending', 'approved'])
    );
    const snapshot = await getDocs(q);
    
    const bookingsOnDate = snapshot.docs
      .map(doc => doc.data())
      .filter(booking => {
        const bookingDate = new Date(booking.confirmedDate || booking.preferredDate)
          .toISOString()
          .split('T')[0];
        return bookingDate === targetDate;
      });

    const bookedCapacity = bookingsOnDate.reduce(
      (sum, b) => sum + (b.numberOfStudents || 0), 
      0
    );

    return {
      available: bookedCapacity < location.capacity,
      capacity: location.capacity,
      booked: bookedCapacity,
      remaining: location.capacity - bookedCapacity
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

export default {
  FIELD_VISIT_LOCATIONS,
  bookFieldVisit,
  createFieldVisitBooking,
  getAllBookings,
  getBookingsBySchool,
  getBookingsByTeacher,
  getBookingById,
  getPendingBookings,
  updateBookingStatus,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
  getBookingStatistics,
  getBookingsByDateRange,
  checkAvailability
};
