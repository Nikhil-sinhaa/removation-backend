import { Response } from 'express';
import Project from '../models/Project';
import { AuthRequest } from '../middleware/authMiddleware';

// Get all projects for user
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find({ userId: req.user?.userId });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    });
  }
};

// Create new project
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user?.userId
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get single project
export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user?.userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project'
    });
  }
};

// Update project
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete project
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project'
    });
  }
};