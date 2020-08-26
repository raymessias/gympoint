module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  database: 'gympoint',
  username: 'postgres',
  password: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
}
