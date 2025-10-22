import connectToDatabase from '@/lib/mongodb';
import { Review, Visitor } from '@/models/Visitor';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { visitorId, rating, review, story } = await request.json();

    // Validate required fields
    if (!visitorId || !rating || !review) {
      return Response.json(
        { error: 'Visitor ID, rating, and review are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if visitor exists
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return Response.json(
        { error: 'Visitor not found' },
        { status: 404 }
      );
    }

    // Create new review
    const newReview = new Review({
      visitorId,
      rating: parseInt(rating),
      review: review.trim(),
      story: story ? story.trim() : '',
    });

    await newReview.save();

    return Response.json({
      success: true,
      reviewId: newReview._id,
      message: 'Review submitted successfully'
    });

  } catch (error) {
    console.error('Error saving review:', error);
    return Response.json(
      { error: 'Failed to save review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const reviews = await Review.find({})
      .populate('visitorId', 'name country')
      .sort({ createdAt: -1 })
      .limit(100);

    return Response.json({ reviews });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}