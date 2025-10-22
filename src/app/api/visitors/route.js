import connectToDatabase from '@/lib/mongodb';
import { Visitor } from '@/models/Visitor';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { name, country, interests } = await request.json();

    // Validate required fields
    if (!name || !country || !interests) {
      return Response.json(
        { error: 'Name, country, and interests are required' },
        { status: 400 }
      );
    }

    // Create new visitor
    const visitor = new Visitor({
      name: name.trim(),
      country: country.trim(),
      interests: interests.trim(),
    });

    await visitor.save();

    return Response.json({
      success: true,
      visitorId: visitor._id,
      message: 'Visitor information saved successfully'
    });

  } catch (error) {
    console.error('Error saving visitor:', error);
    return Response.json(
      { error: 'Failed to save visitor information' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const visitors = await Visitor.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .select('name country interests createdAt');

    return Response.json({ visitors });

  } catch (error) {
    console.error('Error fetching visitors:', error);
    return Response.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}