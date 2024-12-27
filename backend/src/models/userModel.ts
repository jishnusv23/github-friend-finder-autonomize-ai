import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../config/database"; // Import your Sequelize instance here

// Define the interface
export interface UserAttributes {
  id?: string;
  username: string;
  avatar_url: string;
  type: string;
  repos_url: string;
  name?: string | null;
  location?: string | null;
  email?: string | null;
  bio?: string | null;
  followers?: number | null;
  following?: number | null;
  deleted: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
}

// Optional attributes for creating new user
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

// Extend Sequelize Model
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public avatar_url!: string;
  public type!: string;
  public repos_url!: string;
  public name!: string | null;
  public location!: string | null;
  public email!: string | null;
  public bio!: string | null;
  public followers!: number | null;
  public following!: number | null;
  public deleted!: boolean;
  public created_at!: Date | null;
  public updated_at!: Date | null;
}

// Initialize and export the model
const UserModel = sequelize.define<User>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    repos_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export default UserModel;
