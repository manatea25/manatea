// 📱 FLAP - FlutterFlow Custom Actions
// Всі необхідні custom actions для повнофункціонального застосунку

import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:facebook_auth/facebook_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';
import 'dart:io';
import 'dart:math';

// =============================================================================
// 🔐 AUTHENTICATION ACTIONS
// =============================================================================

/// Sign in with Google
Future<User?> signInWithGoogle() async {
  try {
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    if (googleUser == null) return null;
    
    final GoogleSignInAuthentication googleAuth = 
        await googleUser.authentication;
    
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    
    final userCredential = await FirebaseAuth.instance
        .signInWithCredential(credential);
    
    // Create user profile if first time
    await createUserProfileIfNotExists(userCredential.user!);
    
    return userCredential.user;
  } catch (e) {
    print('Google Sign In Error: $e');
    return null;
  }
}

/// Sign in with Facebook
Future<User?> signInWithFacebook() async {
  try {
    final LoginResult result = await FacebookAuth.instance.login();
    
    if (result.status == LoginStatus.success) {
      final AccessToken accessToken = result.accessToken!;
      
      final credential = FacebookAuthProvider.credential(
        accessToken.token,
      );
      
      final userCredential = await FirebaseAuth.instance
          .signInWithCredential(credential);
      
      // Create user profile if first time
      await createUserProfileIfNotExists(userCredential.user!);
      
      return userCredential.user;
    }
    return null;
  } catch (e) {
    print('Facebook Sign In Error: $e');
    return null;
  }
}

/// Sign in with Phone Number
Future<void> signInWithPhoneNumber(String phoneNumber) async {
  await FirebaseAuth.instance.verifyPhoneNumber(
    phoneNumber: phoneNumber,
    verificationCompleted: (PhoneAuthCredential credential) async {
      await FirebaseAuth.instance.signInWithCredential(credential);
    },
    verificationFailed: (FirebaseAuthException e) {
      print('Phone verification failed: ${e.message}');
    },
    codeSent: (String verificationId, int? resendToken) {
      // Store verificationId for later use
    },
    codeAutoRetrievalTimeout: (String verificationId) {},
  );
}

/// Verify Phone Code
Future<User?> verifyPhoneCode(String verificationId, String smsCode) async {
  try {
    final credential = PhoneAuthProvider.credential(
      verificationId: verificationId,
      smsCode: smsCode,
    );
    
    final userCredential = await FirebaseAuth.instance
        .signInWithCredential(credential);
    
    await createUserProfileIfNotExists(userCredential.user!);
    
    return userCredential.user;
  } catch (e) {
    print('Phone verification error: $e');
    return null;
  }
}

// =============================================================================
// 👤 USER PROFILE ACTIONS
// =============================================================================

/// Create user profile if not exists
Future<void> createUserProfileIfNotExists(User user) async {
  final userDoc = await FirebaseFirestore.instance
      .collection('users')
      .doc(user.uid)
      .get();
  
  if (!userDoc.exists) {
    await FirebaseFirestore.instance
        .collection('users')
        .doc(user.uid)
        .set({
      'id': user.uid,
      'email': user.email ?? '',
      'name': user.displayName ?? 'Новий користувач',
      'avatar': user.photoURL,
      'position': '',
      'city': '',
      'rating': 0.0,
      'coins': 100, // Welcome bonus
      'subscription': {
        'type': 'free',
        'expires_at': null,
      },
      'badges': ['rookie'],
      'contacts': {
        'phone': user.phoneNumber ?? '',
        'telegram': '',
        'instagram': '',
      },
      'stats': {
        'matches_played': 0,
        'goals': 0,
        'assists': 0,
        'wins': 0,
        'videos_uploaded': 0,
        'challenges_won': 0,
      },
      'created_at': FieldValue.serverTimestamp(),
    });
  }
}

/// Update user profile
Future<bool> updateUserProfile(String userId, Map<String, dynamic> data) async {
  try {
    await FirebaseFirestore.instance
        .collection('users')
        .doc(userId)
        .update(data);
    return true;
  } catch (e) {
    print('Update profile error: $e');
    return false;
  }
}

/// Upload user avatar
Future<String?> uploadUserAvatar(String userId, File imageFile) async {
  try {
    final ref = FirebaseStorage.instance
        .ref()
        .child('avatars')
        .child('$userId.jpg');
    
    await ref.putFile(imageFile);
    final downloadUrl = await ref.getDownloadURL();
    
    // Update user profile with new avatar
    await updateUserProfile(userId, {'avatar': downloadUrl});
    
    return downloadUrl;
  } catch (e) {
    print('Avatar upload error: $e');
    return null;
  }
}

/// Get user profile
Future<Map<String, dynamic>?> getUserProfile(String userId) async {
  try {
    final doc = await FirebaseFirestore.instance
        .collection('users')
        .doc(userId)
        .get();
    
    return doc.exists ? doc.data() : null;
  } catch (e) {
    print('Get user profile error: $e');
    return null;
  }
}

// =============================================================================
// 🎥 VIDEO ACTIONS
// =============================================================================

/// Upload video to Firebase Storage
Future<String?> uploadVideo(File videoFile, String userId) async {
  try {
    final fileName = '${DateTime.now().millisecondsSinceEpoch}.mp4';
    final ref = FirebaseStorage.instance
        .ref()
        .child('videos')
        .child(userId)
        .child(fileName);
    
    final uploadTask = ref.putFile(videoFile);
    
    // Monitor upload progress
    uploadTask.snapshotEvents.listen((TaskSnapshot snapshot) {
      final progress = snapshot.bytesTransferred / snapshot.totalBytes;
      print('Upload progress: ${(progress * 100).toStringAsFixed(2)}%');
    });
    
    await uploadTask;
    return await ref.getDownloadURL();
  } catch (e) {
    print('Video upload error: $e');
    return null;
  }
}

/// Generate video thumbnail
Future<String?> generateVideoThumbnail(String videoUrl, String userId) async {
  try {
    // This would typically use a video processing service
    // For now, return a placeholder or use video_thumbnail package
    return videoUrl; // Placeholder
  } catch (e) {
    print('Thumbnail generation error: $e');
    return null;
  }
}

/// Create video document in Firestore
Future<String?> createVideoDocument({
  required String userId,
  required String title,
  required String videoUrl,
  required String category,
  String? description,
  String? challengeId,
}) async {
  try {
    final videoRef = FirebaseFirestore.instance.collection('videos').doc();
    
    await videoRef.set({
      'id': videoRef.id,
      'userId': userId,
      'title': title,
      'description': description ?? '',
      'videoUrl': videoUrl,
      'thumbnailUrl': videoUrl, // Will be updated with actual thumbnail
      'category': category,
      'challengeId': challengeId,
      'averageRating': 0.0,
      'totalVotes': 0,
      'views': 0,
      'likes': 0,
      'comments': [],
      'createdAt': FieldValue.serverTimestamp(),
    });
    
    // Award coins for video upload
    await awardCoins(userId, 5, 'video_upload');
    
    return videoRef.id;
  } catch (e) {
    print('Create video error: $e');
    return null;
  }
}

/// Get video feed
Future<List<Map<String, dynamic>>> getVideoFeed({
  String? category,
  int limit = 20,
}) async {
  try {
    Query query = FirebaseFirestore.instance
        .collection('videos')
        .orderBy('createdAt', descending: true);
    
    if (category != null && category != 'all') {
      query = query.where('category', isEqualTo: category);
    }
    
    final snapshot = await query.limit(limit).get();
    
    return snapshot.docs.map((doc) => doc.data() as Map<String, dynamic>).toList();
  } catch (e) {
    print('Get video feed error: $e');
    return [];
  }
}

/// Rate video
Future<bool> rateVideo(String videoId, String userId, double rating) async {
  try {
    final videoRef = FirebaseFirestore.instance.collection('videos').doc(videoId);
    final ratingRef = FirebaseFirestore.instance
        .collection('video_ratings')
        .doc('${videoId}_$userId');
    
    // Check if user already rated this video
    final existingRating = await ratingRef.get();
    
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final videoDoc = await transaction.get(videoRef);
      final videoData = videoDoc.data() as Map<String, dynamic>;
      
      double currentAverage = videoData['averageRating']?.toDouble() ?? 0.0;
      int totalVotes = videoData['totalVotes'] ?? 0;
      
      if (existingRating.exists) {
        // Update existing rating
        double oldRating = existingRating.data()!['rating'];
        double newAverage = ((currentAverage * totalVotes) - oldRating + rating) / totalVotes;
        
        transaction.update(videoRef, {'averageRating': newAverage});
        transaction.update(ratingRef, {'rating': rating, 'updatedAt': FieldValue.serverTimestamp()});
      } else {
        // New rating
        double newAverage = ((currentAverage * totalVotes) + rating) / (totalVotes + 1);
        
        transaction.update(videoRef, {
          'averageRating': newAverage,
          'totalVotes': totalVotes + 1,
        });
        
        transaction.set(ratingRef, {
          'videoId': videoId,
          'userId': userId,
          'rating': rating,
          'createdAt': FieldValue.serverTimestamp(),
        });
        
        // Award coin for rating
        await awardCoins(userId, 1, 'video_rating');
      }
    });
    
    return true;
  } catch (e) {
    print('Rate video error: $e');
    return false;
  }
}

// =============================================================================
// ⚽ MATCH ACTIONS
// =============================================================================

/// Create match
Future<String?> createMatch({
  required String creatorId,
  required String title,
  required DateTime date,
  required Map<String, dynamic> location,
  required int maxPlayers,
  required String level,
  int costPerPlayer = 0,
  bool autoBalance = true,
  bool isPrivate = false,
}) async {
  try {
    final matchRef = FirebaseFirestore.instance.collection('matches').doc();
    
    await matchRef.set({
      'id': matchRef.id,
      'creatorId': creatorId,
      'title': title,
      'date': Timestamp.fromDate(date),
      'location': location,
      'maxPlayers': maxPlayers,
      'level': level,
      'costPerPlayer': costPerPlayer,
      'autoBalance': autoBalance,
      'isPrivate': isPrivate,
      'status': 'open',
      'players': {
        'accepted': [
          {
            'userId': creatorId,
            'joinedAt': FieldValue.serverTimestamp(),
            'role': 'creator',
          }
        ],
        'pending': [],
      },
      'teams': {},
      'finalScore': null,
      'createdAt': FieldValue.serverTimestamp(),
    });
    
    return matchRef.id;
  } catch (e) {
    print('Create match error: $e');
    return null;
  }
}

/// Join match
Future<bool> joinMatch(String matchId, String userId) async {
  try {
    final matchRef = FirebaseFirestore.instance.collection('matches').doc(matchId);
    
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final matchDoc = await transaction.get(matchRef);
      final matchData = matchDoc.data() as Map<String, dynamic>;
      
      List<dynamic> acceptedPlayers = matchData['players']['accepted'] ?? [];
      int maxPlayers = matchData['maxPlayers'];
      
      // Check if match is full
      if (acceptedPlayers.length >= maxPlayers) {
        throw Exception('Match is full');
      }
      
      // Check if user already joined
      bool alreadyJoined = acceptedPlayers.any((player) => player['userId'] == userId);
      if (alreadyJoined) {
        throw Exception('User already joined');
      }
      
      // Add user to accepted players
      acceptedPlayers.add({
        'userId': userId,
        'joinedAt': FieldValue.serverTimestamp(),
        'role': 'player',
      });
      
      transaction.update(matchRef, {
        'players.accepted': acceptedPlayers,
      });
    });
    
    return true;
  } catch (e) {
    print('Join match error: $e');
    return false;
  }
}

/// Leave match
Future<bool> leaveMatch(String matchId, String userId) async {
  try {
    final matchRef = FirebaseFirestore.instance.collection('matches').doc(matchId);
    
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final matchDoc = await transaction.get(matchRef);
      final matchData = matchDoc.data() as Map<String, dynamic>;
      
      List<dynamic> acceptedPlayers = matchData['players']['accepted'] ?? [];
      
      // Remove user from accepted players
      acceptedPlayers.removeWhere((player) => player['userId'] == userId);
      
      transaction.update(matchRef, {
        'players.accepted': acceptedPlayers,
      });
    });
    
    return true;
  } catch (e) {
    print('Leave match error: $e');
    return false;
  }
}

/// Balance teams automatically
Future<bool> balanceTeams(String matchId) async {
  try {
    final matchDoc = await FirebaseFirestore.instance
        .collection('matches')
        .doc(matchId)
        .get();
    
    final matchData = matchDoc.data() as Map<String, dynamic>;
    List<dynamic> players = matchData['players']['accepted'] ?? [];
    
    if (players.length < 2) return false;
    
    // Get player ratings
    List<Map<String, dynamic>> playersWithRatings = [];
    for (var player in players) {
      final userDoc = await FirebaseFirestore.instance
          .collection('users')
          .doc(player['userId'])
          .get();
      
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        playersWithRatings.add({
          'userId': player['userId'],
          'rating': userData['rating'] ?? 0.0,
          'position': userData['position'] ?? 'midfielder',
          'name': userData['name'] ?? 'Unknown',
        });
      }
    }
    
    // Sort by rating (descending)
    playersWithRatings.sort((a, b) => b['rating'].compareTo(a['rating']));
    
    // Balance teams using snake draft
    List<Map<String, dynamic>> team1 = [];
    List<Map<String, dynamic>> team2 = [];
    
    for (int i = 0; i < playersWithRatings.length; i++) {
      if (i % 4 == 0 || i % 4 == 3) {
        team1.add(playersWithRatings[i]);
      } else {
        team2.add(playersWithRatings[i]);
      }
    }
    
    // Calculate team averages
    double team1Average = team1.isEmpty ? 0.0 : 
        team1.map((p) => p['rating'] as double).reduce((a, b) => a + b) / team1.length;
    double team2Average = team2.isEmpty ? 0.0 :
        team2.map((p) => p['rating'] as double).reduce((a, b) => a + b) / team2.length;
    
    // Generate team names
    List<String> teamNames = [
      'Барселона', 'Реал Мадрид', 'Ліверпуль', 'Манчестер Сіті',
      'Баварія', 'ПСЖ', 'Ювентус', 'Челсі', 'Арсенал', 'Тоттенхем'
    ];
    teamNames.shuffle();
    
    Map<String, dynamic> teams = {
      'team1': {
        'name': teamNames[0],
        'players': team1,
        'averageRating': team1Average,
      },
      'team2': {
        'name': teamNames[1],
        'players': team2,
        'averageRating': team2Average,
      },
    };
    
    // Update match with balanced teams
    await FirebaseFirestore.instance
        .collection('matches')
        .doc(matchId)
        .update({'teams': teams});
    
    return true;
  } catch (e) {
    print('Balance teams error: $e');
    return false;
  }
}

/// Get available matches
Future<List<Map<String, dynamic>>> getAvailableMatches({
  String? city,
  String? level,
  int limit = 20,
}) async {
  try {
    Query query = FirebaseFirestore.instance
        .collection('matches')
        .where('status', isEqualTo: 'open')
        .where('date', isGreaterThan: Timestamp.now())
        .orderBy('date');
    
    final snapshot = await query.limit(limit).get();
    
    return snapshot.docs.map((doc) => doc.data() as Map<String, dynamic>).toList();
  } catch (e) {
    print('Get matches error: $e');
    return [];
  }
}

// =============================================================================
// 🏆 CHALLENGE ACTIONS
// =============================================================================

/// Create challenge
Future<String?> createChallenge({
  required String creatorId,
  required String title,
  required String description,
  required String category,
  required int duration, // days
  int entryFee = 20,
}) async {
  try {
    final challengeRef = FirebaseFirestore.instance.collection('challenges').doc();
    final endDate = DateTime.now().add(Duration(days: duration));
    
    await challengeRef.set({
      'id': challengeRef.id,
      'creatorId': creatorId,
      'title': title,
      'description': description,
      'category': category,
      'entryFee': entryFee,
      'prizePool': entryFee, // Creator's entry fee
      'participants': [creatorId],
      'submissions': {},
      'status': 'active',
      'endDate': Timestamp.fromDate(endDate),
      'createdAt': FieldValue.serverTimestamp(),
    });
    
    // Deduct entry fee from creator
    await deductCoins(creatorId, entryFee, 'challenge_entry');
    
    return challengeRef.id;
  } catch (e) {
    print('Create challenge error: $e');
    return null;
  }
}

/// Join challenge
Future<bool> joinChallenge(String challengeId, String userId) async {
  try {
    final challengeRef = FirebaseFirestore.instance.collection('challenges').doc(challengeId);
    
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final challengeDoc = await transaction.get(challengeRef);
      final challengeData = challengeDoc.data() as Map<String, dynamic>;
      
      List<dynamic> participants = challengeData['participants'] ?? [];
      int entryFee = challengeData['entryFee'] ?? 20;
      int prizePool = challengeData['prizePool'] ?? 0;
      
      // Check if user already joined
      if (participants.contains(userId)) {
        throw Exception('User already joined challenge');
      }
      
      // Check if user has enough coins
      final userDoc = await FirebaseFirestore.instance
          .collection('users')
          .doc(userId)
          .get();
      final userData = userDoc.data() as Map<String, dynamic>;
      int userCoins = userData['coins'] ?? 0;
      
      if (userCoins < entryFee) {
        throw Exception('Insufficient coins');
      }
      
      // Add user to participants and update prize pool
      participants.add(userId);
      transaction.update(challengeRef, {
        'participants': participants,
        'prizePool': prizePool + entryFee,
      });
      
      // Deduct entry fee
      transaction.update(FirebaseFirestore.instance.collection('users').doc(userId), {
        'coins': userCoins - entryFee,
      });
    });
    
    return true;
  } catch (e) {
    print('Join challenge error: $e');
    return false;
  }
}

/// Submit video to challenge
Future<bool> submitChallengeVideo(String challengeId, String userId, String videoId) async {
  try {
    await FirebaseFirestore.instance
        .collection('challenges')
        .doc(challengeId)
        .update({
      'submissions.$userId': {
        'videoId': videoId,
        'submittedAt': FieldValue.serverTimestamp(),
      }
    });
    
    return true;
  } catch (e) {
    print('Submit challenge video error: $e');
    return false;
  }
}

// =============================================================================
// 💰 COINS & REWARDS SYSTEM
// =============================================================================

/// Award coins to user
Future<bool> awardCoins(String userId, int amount, String reason) async {
  try {
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final userRef = FirebaseFirestore.instance.collection('users').doc(userId);
      final userDoc = await transaction.get(userRef);
      
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        int currentCoins = userData['coins'] ?? 0;
        
        transaction.update(userRef, {'coins': currentCoins + amount});
        
        // Log transaction
        final transactionRef = FirebaseFirestore.instance.collection('transactions').doc();
        transaction.set(transactionRef, {
          'id': transactionRef.id,
          'userId': userId,
          'type': 'earn',
          'amount': amount,
          'reason': reason,
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    });
    
    return true;
  } catch (e) {
    print('Award coins error: $e');
    return false;
  }
}

/// Deduct coins from user
Future<bool> deductCoins(String userId, int amount, String reason) async {
  try {
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final userRef = FirebaseFirestore.instance.collection('users').doc(userId);
      final userDoc = await transaction.get(userRef);
      
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        int currentCoins = userData['coins'] ?? 0;
        
        if (currentCoins < amount) {
          throw Exception('Insufficient coins');
        }
        
        transaction.update(userRef, {'coins': currentCoins - amount});
        
        // Log transaction
        final transactionRef = FirebaseFirestore.instance.collection('transactions').doc();
        transaction.set(transactionRef, {
          'id': transactionRef.id,
          'userId': userId,
          'type': 'spend',
          'amount': amount,
          'reason': reason,
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    });
    
    return true;
  } catch (e) {
    print('Deduct coins error: $e');
    return false;
  }
}

/// Purchase badge
Future<bool> purchaseBadge(String userId, String badgeId, int cost) async {
  try {
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final userRef = FirebaseFirestore.instance.collection('users').doc(userId);
      final userDoc = await transaction.get(userRef);
      
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        int currentCoins = userData['coins'] ?? 0;
        List<dynamic> badges = userData['badges'] ?? [];
        
        if (currentCoins < cost) {
          throw Exception('Insufficient coins');
        }
        
        if (badges.contains(badgeId)) {
          throw Exception('Badge already owned');
        }
        
        badges.add(badgeId);
        
        transaction.update(userRef, {
          'coins': currentCoins - cost,
          'badges': badges,
        });
        
        // Log transaction
        final transactionRef = FirebaseFirestore.instance.collection('transactions').doc();
        transaction.set(transactionRef, {
          'id': transactionRef.id,
          'userId': userId,
          'type': 'spend',
          'amount': cost,
          'reason': 'badge_purchase_$badgeId',
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    });
    
    return true;
  } catch (e) {
    print('Purchase badge error: $e');
    return false;
  }
}

// =============================================================================
// 📊 RATING SYSTEM
// =============================================================================

/// Update user rating after match
Future<bool> updateUserRating(String userId, double newRating, String source) async {
  try {
    await FirebaseFirestore.instance.runTransaction((transaction) async {
      final userRef = FirebaseFirestore.instance.collection('users').doc(userId);
      final userDoc = await transaction.get(userRef);
      
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        double currentRating = userData['rating']?.toDouble() ?? 0.0;
        
        // Weighted average: 70% matches, 30% videos/challenges
        double finalRating = source == 'match' 
            ? (currentRating * 0.3) + (newRating * 0.7)
            : (currentRating * 0.7) + (newRating * 0.3);
        
        // Ensure rating stays within bounds (0.0 - 5.0)
        finalRating = finalRating.clamp(0.0, 5.0);
        
        transaction.update(userRef, {'rating': finalRating});
        
        // Log rating change
        final ratingRef = FirebaseFirestore.instance.collection('rating_history').doc();
        transaction.set(ratingRef, {
          'userId': userId,
          'oldRating': currentRating,
          'newRating': finalRating,
          'source': source,
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    });
    
    return true;
  } catch (e) {
    print('Update rating error: $e');
    return false;
  }
}

// =============================================================================
// 🔧 UTILITY FUNCTIONS
// =============================================================================

/// Pick image from camera or gallery
Future<File?> pickImage({bool fromCamera = false}) async {
  try {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
      source: fromCamera ? ImageSource.camera : ImageSource.gallery,
      maxWidth: 1024,
      maxHeight: 1024,
      imageQuality: 85,
    );
    
    return pickedFile != null ? File(pickedFile.path) : null;
  } catch (e) {
    print('Pick image error: $e');
    return null;
  }
}

/// Pick video from camera or gallery
Future<File?> pickVideo({bool fromCamera = false}) async {
  try {
    final picker = ImagePicker();
    final pickedFile = await picker.pickVideo(
      source: fromCamera ? ImageSource.camera : ImageSource.gallery,
      maxDuration: const Duration(minutes: 5),
    );
    
    return pickedFile != null ? File(pickedFile.path) : null;
  } catch (e) {
    print('Pick video error: $e');
    return null;
  }
}

/// Generate random string
String generateRandomString(int length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  final random = Random();
  return String.fromCharCodes(
    Iterable.generate(length, (_) => chars.codeUnitAt(random.nextInt(chars.length)))
  );
}

/// Format timestamp to readable string
String formatTimestamp(Timestamp timestamp) {
  final date = timestamp.toDate();
  final now = DateTime.now();
  final difference = now.difference(date);
  
  if (difference.inMinutes < 1) {
    return 'щойно';
  } else if (difference.inHours < 1) {
    return '${difference.inMinutes} хв тому';
  } else if (difference.inDays < 1) {
    return '${difference.inHours} год тому';
  } else if (difference.inDays < 7) {
    return '${difference.inDays} дн тому';
  } else {
    return '${date.day}.${date.month}.${date.year}';
  }
}

/// Calculate distance between two coordinates
double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
  const double earthRadius = 6371; // km
  
  double dLat = (lat2 - lat1) * (pi / 180);
  double dLon = (lon2 - lon1) * (pi / 180);
  
  double a = sin(dLat / 2) * sin(dLat / 2) +
      cos(lat1 * (pi / 180)) * cos(lat2 * (pi / 180)) *
      sin(dLon / 2) * sin(dLon / 2);
  
  double c = 2 * atan2(sqrt(a), sqrt(1 - a));
  
  return earthRadius * c;
}

// =============================================================================
// 🔔 NOTIFICATION HELPERS
// =============================================================================

/// Send push notification (placeholder for FCM implementation)
Future<void> sendPushNotification(String userId, String title, String body) async {
  // Implementation would depend on your FCM setup
  print('Sending notification to $userId: $title - $body');
}

/// Create in-app notification
Future<void> createInAppNotification(String userId, String type, String message) async {
  try {
    await FirebaseFirestore.instance.collection('notifications').add({
      'userId': userId,
      'type': type,
      'message': message,
      'read': false,
      'createdAt': FieldValue.serverTimestamp(),
    });
  } catch (e) {
    print('Create notification error: $e');
  }
}