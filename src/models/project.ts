import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  userId: Types.ObjectId;
  floorPlanImage?: string;
  designStyle?: string;
  vastuScore?: number;
  elements: Array<{
    type: string;
    position: { x: number; y: number };
    dimensions?: { width: number; height: number };
    zone?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    floorPlanImage: String,
    designStyle: String,
    vastuScore: {
      type: Number,
      min: 0,
      max: 100
    },
    elements: [{
      type: {
        type: String,
        required: true,
        enum: ['bed', 'kitchen', 'toilet', 'living-room', 'dining', 'pooja-room', 'wardrobe', 'other']
      },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
      },
      dimensions: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 }
      },
      zone: {
        type: String,
        enum: ['north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west', 'center']
      }
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProject>('Project', projectSchema);