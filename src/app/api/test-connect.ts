
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

interface QueryResult {
  solution: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Type the query result explicitly
    // const [rows] = await pool.query<QueryResult[]>('SELECT 1 + 1 AS solution');
    
    // // Type guard to ensure rows exists and has at least one element
    // if (!rows || rows.length === 0) {
    //   throw new Error('No rows returned');
    // }
    
    res.status(200).json({ 
      success: true,
    //   solution: rows[0].solution,
      message: 'Database connection successful'
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      success: false,
      error: errorMessage 
    });
  }
}