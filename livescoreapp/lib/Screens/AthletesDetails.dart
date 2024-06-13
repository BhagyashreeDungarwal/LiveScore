import 'package:flutter/material.dart';

class AthleteDetails extends StatelessWidget {
  final Map<String, dynamic> athlete;

  const AthleteDetails({Key? key, required this.athlete}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Athlete Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 60,
                child: athlete['imageUrl'] != null
                    ? ClipOval(
                  child: Image.network(
                    'http://192.168.0.106:5032/images/${athlete['imageUrl']}',
                    fit: BoxFit.cover,
                  ),
                )
                    : Icon(Icons.person), // Placeholder icon
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Details:',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            _buildDetailRow(Icons.person, athlete['athleteName'] ?? 'Name not available'),
            //_buildDetailRow(Icons.email, athlete['email'] ?? 'Email not available'),
            //_buildDetailRow(Icons.phone, athlete['contact'] ?? 'Contact not available'),
            _buildDetailRow(Icons.cake, _formatDate(athlete['dateOfBirth'])),
            //_buildDetailRow(Icons.cake, athlete['age'] != null ? athlete['age'].toString() : 'Age not available'),
            _buildDetailRow(Icons.person_outline, athlete['gender'] ?? 'Gender not available'),
            _buildDetailRow(Icons.location_city, athlete['city'] ?? 'City not available'),
            _buildDetailRow(Icons.location_on, athlete['state'] ?? 'State not available'),
            _buildDetailRow(Icons.person_outline, athlete['coachName'] ?? 'Coach Name not available'),
            _buildDetailRow(Icons.category, athlete['categoryName'] ?? 'Category Name not available'),
            //_buildDetailRow(Icons.person, athlete['coordinator'] ?? 'Coordinator not available'),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 28,
            color: Colors.blueAccent,
          ),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              value,
              style: TextStyle(fontSize: 18),
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null || dateStr.isEmpty) {
      return 'Date of Birth not available';
    }
    try {
      DateTime? date = DateTime.parse(dateStr);
      return date != null ? '${date.month}/${date.day}/${date.year}' : 'Invalid Date';
    } catch (e) {
      print('Error parsing date: $e');
      return 'Invalid Date';
    }
  }
}
