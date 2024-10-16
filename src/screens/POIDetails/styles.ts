import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#ddd',
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
    zIndex: 2,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  starRating: {
    fontSize: 20,
    color: '#f1c40f',
    marginRight: 10,
  },
  reviewsCount: {
    fontSize: 16,
    color: '#777',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridItem: {
    width: '45%',
    paddingVertical: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  gridText: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    marginBottom: 25, // Increased margin for better spacing below each section
    paddingVertical: 15, // Enough padding for the content inside the section
    paddingHorizontal: 10, // Horizontal padding for better structure
    backgroundColor: '#eeebeb', // Optional: background color for section distinction
    borderRadius: 10, // Optional: rounded corners for a cleaner look
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  seeMoreLink: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'right',
  },
  websiteLink: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 15,
  },
});

export default styles;
