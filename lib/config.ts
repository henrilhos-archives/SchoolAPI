export class Config {
  public MONGODB_URI: string = process.env.MONGODB_URI || "mongodb://localhost/school-db";
}
