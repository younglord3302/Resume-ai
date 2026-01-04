import { Request, Response } from 'express';
import User from '../models/User';

export const getStats = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    // In a real app, you might count "Analyses" or other metrics if you had a model for them.
    // For now, we simulate some stats or just return user count.
    
    res.json({
      totalUsers: userCount,
      analysesPerformed: 120, // specific mock data or real count if we persist analyses
      activeToday: 5,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
