const expressData = {
  id: 'express',
  name: 'Express.js',
  description: 'Best practices, patterns, and conventions for Express.js applications',
  sections: [
    // ─── Section 1: Project Setup & Folder Structure ─────────────────
    {
      id: 'project-setup',
      title: 'Project Setup & Folder Structure',
      blocks: [
        {
          type: 'text',
          content:
            'A well-organized Express.js project follows the MVC (Model-View-Controller) pattern. Separate your server bootstrapping (server.js) from your Express app configuration (app.js).',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'project-root',
            children: [
              {
                name: 'controllers',
                comment: 'Route handlers / business logic',
                children: [
                  { name: 'authController.js' },
                  { name: 'errorController.js' },
                  { name: 'handlerFactory.js', comment: 'Generic CRUD factory' },
                  { name: 'tourController.js' },
                  { name: 'userController.js' },
                  { name: 'reviewController.js' },
                ],
              },
              {
                name: 'models',
                comment: 'Mongoose schemas & models',
                children: [
                  { name: 'tourModel.js' },
                  { name: 'userModel.js' },
                  { name: 'reviewModel.js' },
                ],
              },
              {
                name: 'routes',
                comment: 'Express Router definitions',
                children: [
                  { name: 'tourRoutes.js' },
                  { name: 'userRoutes.js' },
                  { name: 'reviewRoutes.js' },
                ],
              },
              {
                name: 'utils',
                comment: 'Reusable utility classes/functions',
                children: [
                  { name: 'appError.js', comment: 'Custom error class' },
                  { name: 'catchAsync.js', comment: 'Async error wrapper' },
                  { name: 'apiFeatures.js', comment: 'Query builder' },
                  { name: 'email.js', comment: 'Email service' },
                ],
              },
              {
                name: 'public',
                comment: 'Static files (images, CSS)',
                children: [
                  { name: 'img', children: [] },
                  { name: 'css', children: [] },
                ],
              },
              { name: 'app.js', comment: 'Express app configuration' },
              { name: 'server.js', comment: 'Server bootstrap & DB connection' },
              { name: 'config.env', comment: 'Environment variables' },
              { name: 'package.json' },
              { name: '.eslintrc.json' },
              { name: '.gitignore' },
            ],
          },
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Keep server.js minimal — only DB connection, server listening, and process-level error handlers. All Express config (middleware, routes) goes in app.js.',
        },
        {
          type: 'heading',
          content: 'server.js vs app.js Separation',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js',
          code: `const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions (MUST be at the top)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(\`App running on port \${port}...\`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully.');
  server.close(() => console.log('Process terminated.'));
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'The uncaughtException handler must be registered before any other code runs. If it\'s placed after a synchronous error occurs, it won\'t catch it.',
        },
        {
          type: 'heading',
          content: 'Naming Conventions',
        },
        {
          type: 'list',
          items: [
            'Files: camelCase (tourController.js, userModel.js)',
            'Models: PascalCase singular (Tour, User, Review)',
            'Routes: plural (tours, users, reviews)',
            'Controllers: [resource]Controller.js pattern',
            'Environment: config.env or .env at project root',
          ],
        },
      ],
    },

    // ─── Section 2: Essential Packages ────────────────────────────────
    {
      id: 'essential-packages',
      title: 'Essential Packages',
      blocks: [
        {
          type: 'text',
          content:
            'A production-ready Express.js app typically needs these core packages. Install them as needed — don\'t add packages you won\'t use.',
        },
        {
          type: 'heading',
          content: 'Core Framework',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'express',
              description: 'Web framework for Node.js — routing, middleware, HTTP utilities',
              url: 'https://expressjs.com',
            },
            {
              name: 'mongoose',
              description: 'MongoDB ODM — schemas, validation, queries, middleware hooks',
              url: 'https://mongoosejs.com',
            },
            {
              name: 'dotenv',
              description: 'Loads environment variables from .env file into process.env',
              url: 'https://github.com/motdotla/dotenv',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Security',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'helmet',
              description: 'Sets security HTTP headers (CSP, HSTS, X-Frame, etc.)',
              url: 'https://helmetjs.github.io',
            },
            {
              name: 'express-rate-limit',
              description: 'Rate limiting middleware to prevent brute-force attacks',
              url: 'https://github.com/express-rate-limit/express-rate-limit',
            },
            {
              name: 'express-mongo-sanitize',
              description: 'Prevents NoSQL injection by sanitizing user input',
              url: 'https://github.com/fiznool/express-mongo-sanitize',
            },
            {
              name: 'hpp',
              description: 'Protects against HTTP parameter pollution attacks',
              url: 'https://github.com/analog-nico/hpp',
            },
            {
              name: 'cors',
              description: 'Enables Cross-Origin Resource Sharing with configurable options',
              url: 'https://github.com/expressjs/cors',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Authentication',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'jsonwebtoken',
              description: 'JWT creation and verification for stateless authentication',
              url: 'https://github.com/auth0/node-jsonwebtoken',
            },
            {
              name: 'bcryptjs',
              description: 'Password hashing with salt rounds (pure JS, no native deps)',
              url: 'https://github.com/dcodeIO/bcrypt.js',
            },
            {
              name: 'cookie-parser',
              description: 'Parses cookies from incoming requests',
              url: 'https://github.com/expressjs/cookie-parser',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Utilities',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'morgan',
              description: 'HTTP request logger middleware for development',
              url: 'https://github.com/expressjs/morgan',
            },
            {
              name: 'compression',
              description: 'Gzip compression middleware for responses',
              url: 'https://github.com/expressjs/compression',
            },
            {
              name: 'multer',
              description: 'Middleware for handling multipart/form-data (file uploads)',
              url: 'https://github.com/expressjs/multer',
            },
            {
              name: 'sharp',
              description: 'High-performance image processing (resize, format conversion)',
              url: 'https://sharp.pixelplumbing.com',
            },
            {
              name: 'nodemailer',
              description: 'Send emails from Node.js (SMTP, Sendgrid, Mailgun, etc.)',
              url: 'https://nodemailer.com',
            },
            {
              name: 'validator',
              description: 'String validation and sanitization library (isEmail, isURL, etc.)',
              url: 'https://github.com/validatorjs/validator.js',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Development',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'nodemon',
              description: 'Auto-restarts server on file changes during development',
              url: 'https://nodemon.io',
            },
            {
              name: 'eslint + prettier',
              description: 'Linting and code formatting (use Airbnb or Standard config)',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Install commands',
          code: `# Core
npm i express mongoose dotenv

# Security
npm i helmet express-rate-limit express-mongo-sanitize hpp cors

# Auth
npm i jsonwebtoken bcryptjs cookie-parser

# Utilities
npm i morgan compression multer sharp nodemailer validator

# Dev dependencies
npm i -D nodemon eslint prettier eslint-config-airbnb eslint-config-prettier`,
        },
      ],
    },

    // ─── Section 3: App & Server Setup ────────────────────────────────
    {
      id: 'app-server-setup',
      title: 'App & Server Setup',
      blocks: [
        {
          type: 'text',
          content:
            'The app.js file is the heart of your Express application. Middleware order matters — security first, then body parsing, then routes, then error handling.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Trust proxies (for Heroku, Nginx, etc.)
app.enable('trust proxy');

// CORS
app.use(cors());
app.options('*', cors()); // Preflight for all routes

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, try again in an hour!',
});
app.use('/api', limiter);

// Body parser (with size limit!)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'],
  })
);

// Compression
app.use(compression());

// Serving static files
app.use(express.static(\`\${__dirname}/public\`));

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// 3) HANDLE UNDEFINED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(\`Can't find \${req.originalUrl} on this server!\`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Middleware order matters! Security middleware (helmet, rate limiter) must come before body parsers. The error handler must be the very last middleware.',
        },
        {
          type: 'heading',
          content: 'Middleware Ordering Rule',
        },
        {
          type: 'list',
          items: [
            '1. Trust proxy & CORS',
            '2. Security headers (helmet)',
            '3. Rate limiting',
            '4. Body parsing (JSON, URL-encoded, cookies)',
            '5. Data sanitization',
            '6. Parameter pollution protection',
            '7. Compression',
            '8. Static files',
            '9. API routes',
            '10. Undefined route handler (404)',
            '11. Global error handler (last!)',
          ],
        },
        {
          type: 'heading',
          content: 'Database Connection Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js — DB connection',
          code: `const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// For local development:
// mongoose.connect('mongodb://localhost:27017/yourdb')`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Never hardcode database credentials. Always use environment variables and replace placeholders at runtime.',
        },
      ],
    },

    // ─── Section 4: Routing Best Practices ────────────────────────────
    {
      id: 'routing',
      title: 'Routing Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Use Express Router to organize routes into separate files per resource. Follow RESTful conventions and use middleware chaining for auth/validation.',
        },
        {
          type: 'heading',
          content: 'Basic Router Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'routes/tourRoutes.js',
          code: `const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Nested routes: POST /tours/:tourId/reviews → reviewRouter
router.use('/:tourId/reviews', reviewRouter);

// Public routes
router.route('/top-5-cheap').get(
  tourController.aliasTopTours, // Middleware to preset query
  tourController.getAllTours
);

router.route('/tour-stats').get(tourController.getTourStats);

// CRUD routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;`,
        },
        {
          type: 'heading',
          content: 'Nested Routes with mergeParams',
        },
        {
          type: 'text',
          content:
            'When a child resource belongs to a parent (e.g., reviews belong to a tour), use nested routes and mergeParams: true to access parent params.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'routes/reviewRoutes.js',
          code: `const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// mergeParams gives access to :tourId from parent router
const router = express.Router({ mergeParams: true });

// All review routes require authentication
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;`,
        },
        {
          type: 'heading',
          content: 'Route Aliasing Middleware',
        },
        {
          type: 'text',
          content:
            'Create middleware functions that preset query parameters for common queries. This keeps URLs clean while reusing the same controller.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/tourController.js',
          code: `// Alias middleware: presets query for "top 5 cheap" tours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Usage in router:
// router.route('/top-5-cheap').get(aliasTopTours, getAllTours);`,
        },
        {
          type: 'heading',
          content: 'Mounting Routers in app.js',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js — route mounting',
          code: `// Each resource gets its own base path
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// This means tourRouter handles:
//   GET  /api/v1/tours
//   POST /api/v1/tours
//   GET  /api/v1/tours/:id
//   ...etc`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always version your API routes (/api/v1/...). When you need breaking changes, create /api/v2/ routes while keeping v1 working.',
        },
        {
          type: 'heading',
          content: 'RESTful Route Conventions',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'RESTful routes for a resource',
          code: `GET    /api/v1/tours          → Get all tours
POST   /api/v1/tours          → Create tour
GET    /api/v1/tours/:id      → Get one tour
PATCH  /api/v1/tours/:id      → Update tour (partial)
DELETE /api/v1/tours/:id      → Delete tour

// Nested resource routes:
GET    /api/v1/tours/:tourId/reviews     → Get reviews for tour
POST   /api/v1/tours/:tourId/reviews     → Create review on tour`,
        },
      ],
    },

    // ─── Section 5: Controllers & Handler Factory ─────────────────────
    {
      id: 'controllers',
      title: 'Controllers & Handler Factory',
      blocks: [
        {
          type: 'text',
          content:
            'The handler factory pattern eliminates repetitive CRUD code. Write generic functions once, then generate specific handlers for each model.',
        },
        {
          type: 'heading',
          content: 'Handler Factory — DRY CRUD',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/handlerFactory.js',
          code: `const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return updated document
      runValidators: true, // Run schema validators on update
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Allow nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { data: doc },
    });
  });`,
        },
        {
          type: 'heading',
          content: 'Using the Factory in Controllers',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/tourController.js',
          code: `const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// Factory-generated handlers (one line each!)
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// Custom handler for business logic
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});`,
        },
        {
          type: 'heading',
          content: 'Nested Route Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/reviewController.js',
          code: `const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// Middleware: set tour & user IDs from nested route params
exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use the factory for standard CRUD, but write custom handlers for complex business logic like aggregation pipelines, file processing, or multi-step operations.',
        },
        {
          type: 'heading',
          content: 'Response Format Convention',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'JSend-style response format',
          code: `// Success (single document)
{ status: 'success', data: { data: doc } }

// Success (list with count)
{ status: 'success', results: 10, data: { data: docs } }

// Success (delete — no body)
// 204 No Content

// Error
{ status: 'fail', message: 'Error description' }

// Server error
{ status: 'error', message: 'Something went wrong' }`,
        },
      ],
    },

    // ─── Section 6: Models & Mongoose ─────────────────────────────────
    {
      id: 'models',
      title: 'Models & Mongoose',
      blocks: [
        {
          type: 'text',
          content:
            'Mongoose models define your data structure, validation rules, and business logic. Use schemas with built-in and custom validators, virtuals, hooks, and indexes.',
        },
        {
          type: 'heading',
          content: 'Schema Design with Validation',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/tourModel.js',
          code: `const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Must be <= 40 characters'],
      minlength: [10, 'Must be >= 10 characters'],
    },
    slug: String,
    duration: { type: Number, required: [true, 'Must have a duration'] },
    difficulty: {
      type: String,
      required: [true, 'Must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Must be: easy, medium, or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be >= 1.0'],
      max: [5, 'Rating must be <= 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666 → 4.7
    },
    price: { type: Number, required: [true, 'Must have a price'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // 'this' only works on NEW document creation
          return val < this.price;
        },
        message: 'Discount ({VALUE}) must be below regular price',
      },
    },
    summary: { type: String, trim: true },
    // Reference to another model
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);`,
        },
        {
          type: 'heading',
          content: 'Indexes for Performance',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Compound index for common query patterns
tourSchema.index({ price: 1, ratingsAverage: -1 });

// Unique index
tourSchema.index({ slug: 1 });

// Geospatial index (for location queries)
tourSchema.index({ startLocation: '2dsphere' });`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Add indexes for fields you frequently query, sort, or filter by. Compound indexes support queries on any prefix of the indexed fields.',
        },
        {
          type: 'heading',
          content: 'Virtual Properties',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Computed field (not stored in DB)
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate: reverse relationship
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',  // Field on Review that references Tour
  localField: '_id',      // Field on Tour
});`,
        },
        {
          type: 'heading',
          content: 'Mongoose Middleware (Hooks)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// DOCUMENT MIDDLEWARE — runs on .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE — runs on .find(), .findOne(), etc.
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// Auto-populate references on all find queries
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

// AGGREGATION MIDDLEWARE — runs before .aggregate()
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;`,
        },
        {
          type: 'heading',
          content: 'User Model with Password Hashing',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/userModel.js',
          code: `const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please tell us your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // Never include in query results
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // Don't persist to DB
  next();
});

// Set passwordChangedAt timestamp
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // Ensure JWT is issued after
  next();
});

// Exclude inactive users from queries
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance methods
userSchema.methods.correctPassword = async function (candidate, userPassword) {
  return await bcrypt.compare(candidate, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000, 10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken; // Send unhashed token to user
};

const User = mongoose.model('User', userSchema);
module.exports = User;`,
        },
        {
          type: 'heading',
          content: 'Review Model with Static Methods',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/reviewModel.js',
          code: `const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: [true, 'Review cannot be empty!'] },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});

// One review per user per tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Static method: recalculate tour ratings
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Recalculate after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// Recalculate after update/delete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Instance methods (schema.methods) work on documents. Static methods (schema.statics) work on the Model itself. Use statics for collection-wide operations like aggregation.',
        },
      ],
    },

    // ─── Section 7: Middleware Patterns ────────────────────────────────
    {
      id: 'middleware',
      title: 'Middleware Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Express middleware functions have access to req, res, and next. Master these patterns for clean, reusable middleware.',
        },
        {
          type: 'heading',
          content: 'catchAsync — Async Error Wrapper',
        },
        {
          type: 'text',
          content:
            'The most important utility in any Express app. Wraps async route handlers so you never need try/catch blocks in controllers.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/catchAsync.js',
          code: `module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Usage in controllers:
const catchAsync = require('../utils/catchAsync');

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({ status: 'success', data: { data: newTour } });
  // No try/catch needed! Errors auto-forwarded to error handler
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'catchAsync replaces try/catch in every single async controller. Without it, you\'d need to wrap every handler — with it, errors automatically reach your global error handler.',
        },
        {
          type: 'heading',
          content: 'Query Alias Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Pre-set query params for common queries
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Route: GET /api/v1/tours/top-5-cheap
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);`,
        },
        {
          type: 'heading',
          content: 'Request Timestamp Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Add request timestamp to every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});`,
        },
        {
          type: 'heading',
          content: 'Middleware for Nested Route Data',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Inject IDs from nested route params and auth
exports.setTourUserIds = (req, res, next) => {
  // Allow manual override, but default from route/auth
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};`,
        },
        {
          type: 'heading',
          content: 'Higher-Order Middleware Factory',
        },
        {
          type: 'text',
          content:
            'Use functions that return middleware when you need configurable behavior. This is how restrictTo works with different roles.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Factory: returns middleware configured with specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// Usage: only admin and lead-guide can delete
router.delete('/:id',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.deleteTour
);`,
        },
        {
          type: 'heading',
          content: 'Image Upload Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const multer = require('multer');
const sharp = require('sharp');

// Store in memory for processing
const multerStorage = multer.memoryStorage();

// Filter: only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Single file
exports.uploadUserPhoto = upload.single('photo');

// Multiple fields
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// Resize after upload
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = \`user-\${req.user.id}-\${Date.now()}.jpeg\`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(\`public/img/users/\${req.file.filename}\`);

  next();
});`,
        },
      ],
    },

    // ─── Section 8: Error Handling ────────────────────────────────────
    {
      id: 'error-handling',
      title: 'Error Handling',
      blocks: [
        {
          type: 'text',
          content:
            'A robust error handling strategy distinguishes between operational errors (expected, like invalid input) and programming errors (bugs). Handle them differently in development vs production.',
        },
        {
          type: 'heading',
          content: 'Custom AppError Class',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/appError.js',
          code: `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Mark as operational (vs programming error)

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// Usage anywhere in the app:
const AppError = require('../utils/appError');
return next(new AppError('No tour found with that ID', 404));`,
        },
        {
          type: 'heading',
          content: 'Global Error Handler',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/errorController.js',
          code: `const AppError = require('../utils/appError');

// Database-specific error handlers
const handleCastErrorDB = (err) => {
  const message = \`Invalid \${err.path}: \${err.value}.\`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\\\?.)*?\\1/)[0];
  const message = \`Duplicate field value: \${value}. Use another value!\`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = \`Invalid input data. \${errors.join('. ')}\`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Development: send full error details
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Production: only send operational errors to client
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown error: don't leak details
  console.error('ERROR:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Catching Undefined Routes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js — after all routes',
          code: `// Must be AFTER all route definitions
app.all('*', (req, res, next) => {
  next(new AppError(\`Can't find \${req.originalUrl} on this server!\`, 404));
});

// Error handling middleware (4 parameters!)
app.use(globalErrorHandler);`,
        },
        {
          type: 'heading',
          content: 'Process-Level Error Handlers',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js — process handlers',
          code: `// Synchronous errors outside Express (must be FIRST)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Async errors outside Express (unhandled promise rejections)
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always close the server gracefully on unhandledRejection — let pending requests finish before shutting down. For uncaughtException, exit immediately since the app is in an undefined state.',
        },
      ],
    },

    // ─── Section 9: Authentication & Authorization ────────────────────
    {
      id: 'authentication',
      title: 'Authentication & Authorization',
      blocks: [
        {
          type: 'text',
          content:
            'JWT-based authentication with HTTP-only cookies. The protect middleware verifies tokens, and restrictTo controls role-based access.',
        },
        {
          type: 'heading',
          content: 'JWT Token Creation & Sending',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/authController.js',
          code: `const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,                      // Can't be accessed by JS
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};`,
        },
        {
          type: 'heading',
          content: 'Signup & Login',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `exports.signup = catchAsync(async (req, res, next) => {
  // Only allow specific fields (prevent role injection!)
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Send token to client
  createSendToken(user, 200, req, res);
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never tell the user whether the email or password was wrong — always use a generic message like "Incorrect email or password" to prevent enumeration attacks.',
        },
        {
          type: 'heading',
          content: 'Route Protection Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token from header or cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS
  req.user = currentUser;
  next();
});`,
        },
        {
          type: 'heading',
          content: 'Role-Based Access Control',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array like ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// Usage in routes:
router.delete(
  '/:id',
  authController.protect,           // Must be logged in
  authController.restrictTo('admin', 'lead-guide'), // Must have role
  tourController.deleteTour
);`,
        },
        {
          type: 'heading',
          content: 'Password Reset Flow',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send token to user's email
  const resetURL = \`\${req.protocol}://\${req.get('host')}/api/v1/users/resetPassword/\${resetToken}\`;

  try {
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!', 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on hashed token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Token not expired
  });

  // 2) If token valid and user exists, set new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); // Runs validators + pre-save hooks

  // 3) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Always hash reset tokens before storing in the database. Send the unhashed token to the user\'s email, then compare hashed versions when they use it.',
        },
      ],
    },

    // ─── Section 10: Security Best Practices ──────────────────────────
    {
      id: 'security',
      title: 'Security Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'A production Express app needs multiple layers of security. Never rely on a single package — apply defense in depth.',
        },
        {
          type: 'heading',
          content: 'Security Middleware Stack',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js — security setup',
          code: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

// 1) Set security HTTP headers
app.use(helmet());

// 2) Rate limiting — prevent brute force
const limiter = rateLimit({
  max: 100,                      // Max requests per window
  windowMs: 60 * 60 * 1000,     // 1 hour
  message: 'Too many requests from this IP, try again in an hour!',
});
app.use('/api', limiter);

// 3) Body parser with size limit — prevent large payloads
app.use(express.json({ limit: '10kb' }));

// 4) Data sanitization against NoSQL injection
// Removes $ and . from req.body, req.query, req.params
app.use(mongoSanitize());

// 5) Prevent HTTP parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'price', 'difficulty'],
  })
);

// 6) CORS — configure per your needs
app.use(cors());
// For specific origin:
// app.use(cors({ origin: 'https://yourfrontend.com' }));
app.options('*', cors()); // Enable preflight for all routes`,
        },
        {
          type: 'heading',
          content: 'What Each Security Package Does',
        },
        {
          type: 'list',
          items: [
            'helmet — Sets 15+ HTTP headers (CSP, HSTS, X-Frame-Options, etc.)',
            'express-rate-limit — Limits repeated requests (login brute force, DDoS mitigation)',
            'express-mongo-sanitize — Strips $ and . from input (prevents {$gt: ""} injection)',
            'hpp — Cleans up duplicate query params (prevents ?sort=price&sort=name attacks)',
            'cors — Controls which origins can access your API',
          ],
        },
        {
          type: 'heading',
          content: 'Password Security Checklist',
        },
        {
          type: 'list',
          items: [
            'Hash with bcrypt (cost factor 12+) — never store plain text',
            'Use select: false on password field — never return in queries',
            'Validate password confirmation at schema level',
            'Clear passwordConfirm after hashing (don\'t persist it)',
            'Track passwordChangedAt for token invalidation',
            'Hash reset tokens before storing in DB',
            'Set expiration on reset tokens (10 min)',
          ],
        },
        {
          type: 'heading',
          content: 'JWT Security',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Cookie settings for JWT
res.cookie('jwt', token, {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  httpOnly: true,    // Prevents XSS access to cookie
  secure: req.secure, // Only HTTPS in production
  sameSite: 'strict', // CSRF protection
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never store JWTs in localStorage — it\'s vulnerable to XSS. Use httpOnly cookies instead. The browser sends them automatically with requests.',
        },
        {
          type: 'heading',
          content: 'Input Validation Tips',
        },
        {
          type: 'list',
          items: [
            'Always limit JSON body size: express.json({ limit: "10kb" })',
            'Use Mongoose schema validators for all fields',
            'Whitelist allowed fields on signup (prevent role injection)',
            'Use the validator library for email, URL, etc.',
            'Sanitize user input before database queries',
          ],
        },
      ],
    },

    // ─── Section 11: API Features ─────────────────────────────────────
    {
      id: 'api-features',
      title: 'API Features',
      blocks: [
        {
          type: 'text',
          content:
            'The APIFeatures class provides a chainable builder pattern for filtering, sorting, field selection, and pagination. One class handles all query operations.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/apiFeatures.js',
          code: `class APIFeatures {
  constructor(query, queryString) {
    this.query = query;        // Mongoose query object
    this.queryString = queryString; // req.query
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering: { duration: { gte: 5 } } → { duration: { $gte: 5 } }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, (match) => \`$\${match}\`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // ?sort=price,-ratingsAverage → 'price -ratingsAverage'
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // Default sort
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // ?fields=name,price,duration → 'name price duration'
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // Exclude __v by default
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;`,
        },
        {
          type: 'heading',
          content: 'Usage in Controllers',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const APIFeatures = require('../utils/apiFeatures');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { data: tours },
  });
});`,
        },
        {
          type: 'heading',
          content: 'Example API Queries',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Query examples',
          code: `# Filtering
GET /api/v1/tours?difficulty=easy&price[lte]=500

# Sorting (descending with -)
GET /api/v1/tours?sort=-price,ratingsAverage

# Field selection (projection)
GET /api/v1/tours?fields=name,price,duration

# Pagination
GET /api/v1/tours?page=2&limit=10

# Combined
GET /api/v1/tours?difficulty=easy&sort=-price&fields=name,price&page=1&limit=5`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'The APIFeatures class is model-agnostic. Use it with any Mongoose model — just pass Model.find() and req.query.',
        },
        {
          type: 'heading',
          content: 'Aggregation Pipeline (Complex Queries)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});`,
        },
      ],
    },

    // ─── Section 12: Environment & Config ─────────────────────────────
    {
      id: 'environment',
      title: 'Environment & Config',
      blocks: [
        {
          type: 'text',
          content:
            'Keep all environment-specific configuration in a .env file. Never commit secrets to version control.',
        },
        {
          type: 'heading',
          content: '.env Template',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'config.env',
          code: `# App
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/mydb
DATABASE_PASSWORD=your_password_here

# JWT
JWT_SECRET=your-ultra-secure-secret-at-least-32-characters-long
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (development — use Mailtrap)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=25
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password

# Email (production — use SendGrid, Mailgun, etc.)
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD=your_sendgrid_api_key
EMAIL_FROM=hello@yourdomain.com`,
        },
        {
          type: 'heading',
          content: 'Loading Environment Variables',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js — at the top',
          code: `const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Now process.env.PORT, process.env.JWT_SECRET, etc. are available
const app = require('./app'); // Import AFTER env is loaded`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Load dotenv BEFORE importing app.js — otherwise any code in app.js that reads process.env will get undefined values.',
        },
        {
          type: 'heading',
          content: '.gitignore Essentials',
        },
        {
          type: 'code',
          language: 'text',
          fileName: '.gitignore',
          code: `node_modules/
config.env
.env
*.env.local
.DS_Store`,
        },
        {
          type: 'heading',
          content: 'Environment-Specific Behavior',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Logging only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Error details only in development
if (process.env.NODE_ENV === 'development') {
  sendErrorDev(err, req, res);
} else {
  sendErrorProd(err, req, res);
}

// Secure cookies only in production
res.cookie('jwt', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
});`,
        },
        {
          type: 'heading',
          content: 'npm Scripts',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json — scripts',
          code: `{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "start:prod": "NODE_ENV=production nodemon server.js",
    "debug": "ndb server.js"
  }
}`,
        },
      ],
    },

    // ─── Section 13: Deployment Checklist ─────────────────────────────
    {
      id: 'deployment',
      title: 'Deployment Checklist',
      blocks: [
        {
          type: 'text',
          content:
            'Before deploying to production, make sure these items are in place. This checklist applies whether you\'re deploying to Heroku, Railway, Render, AWS, or any cloud platform.',
        },
        {
          type: 'heading',
          content: 'Production Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const compression = require('compression');

// Enable trust proxy (for platforms behind reverse proxies)
app.enable('trust proxy');

// Compress all text responses
app.use(compression());`,
        },
        {
          type: 'heading',
          content: 'Graceful Shutdown',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js — SIGTERM handler',
          code: `// Handle SIGTERM (sent by hosting platforms for graceful shutdown)
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully.');
  server.close(() => {
    console.log('Process terminated.');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Pre-Deployment Checklist',
        },
        {
          type: 'list',
          items: [
            'Set NODE_ENV=production in hosting environment',
            'Use environment variables for ALL secrets (DB, JWT, API keys)',
            'Enable compression middleware',
            'Enable trust proxy if behind a reverse proxy',
            'Set up rate limiting for API routes',
            'Enable all security middleware (helmet, mongoSanitize, hpp)',
            'Configure CORS for your frontend domain specifically',
            'Set appropriate JWT expiration times',
            'Add SIGTERM handler for graceful shutdown',
            'Remove console.log statements (use proper logging)',
            'Set up error monitoring (Sentry, LogRocket, etc.)',
            'Configure a process manager (PM2) or use platform\'s built-in',
          ],
        },
        {
          type: 'heading',
          content: 'Production Environment Variables',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Production env vars (set in hosting dashboard)',
          code: `NODE_ENV=production
PORT=3000
DATABASE=mongodb+srv://...
DATABASE_PASSWORD=...
JWT_SECRET=long-random-secret-min-32-chars
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD=...
EMAIL_FROM=noreply@yourdomain.com`,
        },
        {
          type: 'heading',
          content: 'Heroku-Specific Setup',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Heroku deployment commands',
          code: `# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-here
heroku config:set DATABASE=your-mongodb-connection-string

# Deploy
git push heroku main

# View logs
heroku logs --tail`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Always test your production build locally first with NODE_ENV=production to catch environment-specific issues before deploying.',
        },
        {
          type: 'heading',
          content: 'Engine Specification',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json — engines',
          code: `{
  "engines": {
    "node": ">=18.0.0"
  }
}`,
        },
      ],
    },

    // ─── Section 14: File Uploads (Multer) ────────────────────────────
    {
      id: 'file-uploads',
      title: 'File Uploads (Multer)',
      blocks: [
        {
          type: 'text',
          content:
            'Multer is the standard middleware for handling multipart/form-data (file uploads) in Express. It adds a file or files object to the request. Always use memory storage when processing images with Sharp, and disk storage for direct file saving.',
        },
        {
          type: 'heading',
          content: 'Memory Storage (for image processing)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'middleware/upload.js',
          code: `const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Store in memory as Buffer (for Sharp processing)
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Single file upload
exports.uploadUserPhoto = upload.single('photo');

// Multiple files (same field)
exports.uploadTourImages = upload.array('images', 5);

// Mixed fields
exports.uploadTourMedia = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);`,
        },
        {
          type: 'heading',
          content: 'Image Processing with Sharp',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/userController.js',
          code: `exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Set filename for later use in updateMe handler
  req.file.filename = \`user-\${req.user.id}-\${Date.now()}.jpeg\`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(\`public/img/users/\${req.file.filename}\`);

  next();
});

// Process multiple images
exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files?.imageCover || !req.files?.images) return next();

  // Cover image
  req.body.imageCover = \`tour-\${req.params.id}-cover.jpeg\`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(\`public/img/tours/\${req.body.imageCover}\`);

  // Gallery images
  req.body.images = await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = \`tour-\${req.params.id}-\${i + 1}.jpeg\`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(\`public/img/tours/\${filename}\`);
      return filename;
    })
  );

  next();
});`,
        },
        {
          type: 'heading',
          content: 'Disk Storage (direct save)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, \`user-\${req.user.id}-\${Date.now()}.\${ext}\`);
  },
});`,
        },
        {
          type: 'heading',
          content: 'Route Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'routes/userRoutes.js',
          code: `router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Use memory storage (not disk) when processing with Sharp — disk storage writes then reads the file again, wasting I/O. Memory storage keeps the buffer in RAM for direct processing.',
        },
      ],
    },

    // ─── Section 15: Logging (Winston & Morgan) ───────────────────────
    {
      id: 'logging',
      title: 'Logging (Winston & Morgan)',
      blocks: [
        {
          type: 'text',
          content:
            'Morgan handles HTTP request logging, Winston handles application-level logging. Use both together: Morgan for access logs, Winston for errors, warnings, and custom events.',
        },
        {
          type: 'heading',
          content: 'Morgan — HTTP Request Logger',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const morgan = require('morgan');

// Development: colored concise output
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // Output: GET /api/v1/tours 200 12.345 ms - 2345
}

// Production: write to file
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));`,
        },
        {
          type: 'heading',
          content: 'Winston — Application Logger',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/logger.js',
          code: `const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api' },
  transports: [
    // Write errors to error.log
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    // Write all logs to combined.log
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// In development, also log to console with color
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;`,
        },
        {
          type: 'heading',
          content: 'Using the Logger',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const logger = require('./utils/logger');

// Log levels: error, warn, info, http, verbose, debug, silly
logger.info('Server started on port 3000');
logger.error('Database connection failed', { error: err.message });
logger.warn('Rate limit exceeded', { ip: req.ip });
logger.debug('Query params', { query: req.query });`,
        },
        {
          type: 'heading',
          content: 'Replace console.log in Production',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js',
          code: `const logger = require('./utils/logger');

// Instead of console.log
const server = app.listen(port, () => {
  logger.info(\`Server running on port \${port} in \${process.env.NODE_ENV} mode\`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION', { message: err.message, stack: err.stack });
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION', { message: err.message, stack: err.stack });
  process.exit(1);
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'In production, ship logs to a service like Datadog, Loggly, or AWS CloudWatch using Winston transports. Never rely on console output in production — it disappears when the process restarts.',
        },
      ],
    },

    // ─── Section 16: CORS Deep Dive ───────────────────────────────────
    {
      id: 'cors',
      title: 'CORS Deep Dive',
      blocks: [
        {
          type: 'text',
          content:
            'Cross-Origin Resource Sharing (CORS) controls which domains can access your API. Browsers block cross-origin requests by default — your Express server must explicitly allow them.',
        },
        {
          type: 'heading',
          content: 'How CORS Works',
        },
        {
          type: 'list',
          items: [
            'Simple requests (GET, POST with basic headers) go directly, browser checks the Access-Control-Allow-Origin response header',
            'Preflight requests (PUT, DELETE, custom headers) trigger an OPTIONS request first — the browser asks the server if the real request is allowed',
            'The server responds to OPTIONS with allowed methods, headers, and origin — only then does the browser send the real request',
            'Credentials (cookies, auth headers) require Access-Control-Allow-Credentials: true AND a specific origin (not *)',
          ],
        },
        {
          type: 'heading',
          content: 'Basic Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const cors = require('cors');

// Allow all origins (development only!)
app.use(cors());

// Allow specific origin
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://myapp.com',
  'https://www.myapp.com',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));`,
        },
        {
          type: 'heading',
          content: 'CORS with Credentials (Cookies)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js — credentials setup',
          code: `// Backend: must set credentials AND specific origin
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,  // Allow cookies to be sent
}));

// Frontend: must include credentials in fetch
fetch('http://localhost:3000/api/v1/users/me', {
  credentials: 'include', // Send cookies cross-origin
});`,
        },
        {
          type: 'heading',
          content: 'Preflight for Specific Routes',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Handle preflight for all routes
app.options('*', cors());

// Handle preflight for specific route only
app.options('/api/v1/tours/:id', cors());`,
        },
        {
          type: 'heading',
          content: 'CORS Headers Explained',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Manual CORS (without the cors package)',
          code: `app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use origin: "*" with credentials: true — browsers reject it. When using cookies for auth, you MUST specify the exact origin. Also, sameSite: "none" on cookies requires secure: true (HTTPS).',
        },
      ],
    },

    // ─── Section 17: Rate Limiting ────────────────────────────────────
    {
      id: 'rate-limiting',
      title: 'Rate Limiting',
      blocks: [
        {
          type: 'text',
          content:
            'Rate limiting prevents abuse by restricting how many requests a client can make in a given time window. Essential for login routes, API endpoints, and any public-facing server.',
        },
        {
          type: 'heading',
          content: 'Global Rate Limiting',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const rateLimit = require('express-rate-limit');

// Global limiter: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 15 minutes.',
  standardHeaders: true,  // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,   // Disable X-RateLimit-* headers
});

app.use('/api', limiter);`,
        },
        {
          type: 'heading',
          content: 'Stricter Limiter for Auth Routes',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Prevent brute force: 10 login attempts per hour
const loginLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many login attempts. Please try again in an hour.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1/users/login', loginLimiter);
app.use('/api/v1/users/signup', loginLimiter);
app.use('/api/v1/users/forgotPassword', loginLimiter);`,
        },
        {
          type: 'heading',
          content: 'Rate Limiting with Redis (Production)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'For distributed deployments',
          code: `const RedisStore = require('rate-limit-redis');
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  max: 100,
  windowMs: 15 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
});`,
        },
        {
          type: 'heading',
          content: 'Slow Down Instead of Block',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const slowDown = require('express-slow-down');

// After 50 requests, add 500ms delay per request
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: (hits) => hits * 500,
});

app.use('/api', speedLimiter);`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The default in-memory store works for single-server deployments. For multiple servers or containers, use Redis store so rate limits are shared across instances.',
        },
      ],
    },

    // ─── Section 19: Payment Integration (Stripe) ────────────────────
    {
      id: 'payment-integration',
      title: 'Payment Integration (Stripe)',
      blocks: [
        {
          type: 'text',
          content:
            'Stripe is the most popular payment processor for web apps. The flow is: your frontend creates a checkout session via your backend → Stripe hosts the payment page → Stripe sends a webhook to confirm payment.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'stripe',
              description: 'Official Stripe Node.js SDK for payments, subscriptions, and invoices',
              url: 'https://www.npmjs.com/package/stripe',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Create a Checkout Session',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'controllers/paymentController.js',
          code: `import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Stripe Checkout session (redirects user to Stripe's hosted page)
export const createCheckoutSession = async (req, res, next) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment', // 'payment' for one-time, 'subscription' for recurring
    customer_email: req.user.email,
    client_reference_id: req.user.id,

    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    })),

    success_url: \`\${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.CLIENT_URL}/cart\`,
  });

  res.status(200).json({ url: session.url });
};`,
        },
        {
          type: 'heading',
          content: 'Handle Stripe Webhooks',
        },
        {
          type: 'text',
          content:
            'Webhooks are how Stripe tells your server that a payment succeeded. Never trust the frontend for payment confirmation — always verify via webhooks.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'controllers/webhookController.js',
          code: `import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// IMPORTANT: Use express.raw() for this route, NOT express.json()
export const stripeWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,           // raw body buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Fulfill the order: save to DB, send email, etc.
      console.log('Payment successful for:', session.customer_email);
      break;
    }
    case 'invoice.payment_failed': {
      // Handle failed subscription payment
      break;
    }
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }

  res.status(200).json({ received: true });
};`,
        },
        {
          type: 'heading',
          content: 'Route Setup',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'app.js',
          code: `// Webhook route MUST use raw body (before express.json middleware)
app.post(
  '/api/webhook/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

// Regular JSON parsing for all other routes
app.use(express.json());

// Payment routes (protected)
app.use('/api/payments', protect, paymentRoutes);`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'The webhook route MUST receive the raw request body (not parsed JSON) for signature verification. Place it before express.json() middleware, or use express.raw() specifically for that route.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use Stripe CLI to test webhooks locally: stripe listen --forward-to localhost:3000/api/webhook/stripe. It gives you a temporary webhook secret for development.',
        },
      ],
    },

    // ─── Section 20: Real-time Chat (Socket.io) ─────────────────────
    {
      id: 'real-time-chat',
      title: 'Real-time Chat (Socket.io)',
      blocks: [
        {
          type: 'text',
          content:
            'Socket.io enables real-time, bidirectional communication between client and server. It uses WebSockets under the hood but falls back to HTTP long-polling if WebSockets are unavailable.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'socket.io',
              description: 'Server-side real-time engine for Node.js',
              url: 'https://www.npmjs.com/package/socket.io',
            },
            {
              name: 'socket.io-client',
              description: 'Client-side Socket.io library for React/browser',
              url: 'https://www.npmjs.com/package/socket.io-client',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Server Setup',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'server.js',
          code: `import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

// Middleware: authenticate socket connections
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = verifyToken(token); // your JWT verify function
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  console.log(\`User connected: \${socket.user.name}\`);

  // Join a chat room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('userJoined', {
      user: socket.user.name,
      message: \`\${socket.user.name} joined the room\`,
    });
  });

  // Handle incoming messages
  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('newMessage', {
      user: socket.user.name,
      message,
      timestamp: new Date(),
    });
  });

  // Typing indicator
  socket.on('typing', ({ roomId }) => {
    socket.to(roomId).emit('userTyping', { user: socket.user.name });
  });

  socket.on('disconnect', () => {
    console.log(\`User disconnected: \${socket.user.name}\`);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
        },
        {
          type: 'heading',
          content: 'React Client',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useChat.js',
          code: `import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export function useChat(roomId, token) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
    });

    socketRef.current = socket;

    socket.emit('joinRoom', roomId);

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('userTyping', ({ user }) => {
      // Show typing indicator
    });

    return () => socket.disconnect();
  }, [roomId, token]);

  const sendMessage = (message) => {
    socketRef.current?.emit('sendMessage', { roomId, message });
  };

  return { messages, sendMessage };
}`,
        },
        {
          type: 'heading',
          content: 'Key Concepts',
        },
        {
          type: 'list',
          items: [
            'Rooms — group sockets together (e.g., chat rooms, game lobbies). Use socket.join(roomId)',
            'Namespaces — separate communication channels on the same connection (e.g., /chat, /notifications)',
            'socket.emit() — send to the sender only',
            'socket.to(room).emit() — send to everyone in the room EXCEPT the sender',
            'io.to(room).emit() — send to everyone in the room INCLUDING the sender',
            'socket.broadcast.emit() — send to everyone EXCEPT the sender (all rooms)',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For production, use the Redis adapter (@socket.io/redis-adapter) so Socket.io works across multiple server instances behind a load balancer.',
        },
      ],
    },

    // ─── Section 21: Server-Sent Events & Streaming ──────────────────
    {
      id: 'streaming-sse',
      title: 'Server-Sent Events & Streaming',
      blocks: [
        {
          type: 'text',
          content:
            'Server-Sent Events (SSE) allow the server to push updates to the client over a single HTTP connection. Unlike WebSockets, SSE is one-directional (server → client) and works over regular HTTP. Great for live feeds, notifications, and progress updates.',
        },
        {
          type: 'heading',
          content: 'SSE vs WebSockets — When to Use What',
        },
        {
          type: 'list',
          items: [
            'SSE — One-way server → client updates (notifications, live feeds, progress bars, stock prices)',
            'WebSockets — Two-way communication needed (chat, multiplayer games, collaborative editing)',
            'SSE is simpler, auto-reconnects, works through proxies/firewalls, and uses standard HTTP',
            'WebSockets require a protocol upgrade and more complex server setup',
          ],
        },
        {
          type: 'heading',
          content: 'SSE Endpoint',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'controllers/notificationController.js',
          code: `// Server-Sent Events endpoint for live notifications
export const streamNotifications = (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send a comment to keep connection alive (every 30s)
  const keepAlive = setInterval(() => {
    res.write(': keep-alive\\n\\n');
  }, 30000);

  // Send data to client
  const sendEvent = (data, eventName = 'message') => {
    res.write(\`event: \${eventName}\\n\`);
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  // Example: send initial data
  sendEvent({ message: 'Connected to notifications' }, 'connected');

  // Listen for new notifications (from your app logic)
  const onNotification = (notification) => {
    sendEvent(notification, 'notification');
  };

  // Subscribe to events (using EventEmitter, Redis pub/sub, etc.)
  notificationEmitter.on('new', onNotification);

  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(keepAlive);
    notificationEmitter.off('new', onNotification);
    res.end();
  });
};`,
        },
        {
          type: 'heading',
          content: 'React Client with EventSource',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useSSE.js',
          code: `import { useEffect, useState } from 'react';

export function useSSE(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(url, {
      withCredentials: true, // if you need cookies
    });

    eventSource.addEventListener('notification', (e) => {
      setData(JSON.parse(e.data));
    });

    eventSource.onerror = (err) => {
      setError(err);
      eventSource.close();
    };

    // EventSource auto-reconnects on connection loss

    return () => eventSource.close();
  }, [url]);

  return { data, error };
}`,
        },
        {
          type: 'heading',
          content: 'Streaming Large Responses',
        },
        {
          type: 'text',
          content:
            'For streaming large files or AI-generated text, use Node.js streams to send data in chunks without loading everything into memory.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Streaming a file download',
          code: `import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

export const downloadLargeFile = async (req, res) => {
  const filePath = \`./exports/\${req.params.filename}\`;

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', \`attachment; filename="\${req.params.filename}"\`);

  // Stream file to response (memory efficient)
  const fileStream = createReadStream(filePath);
  await pipeline(fileStream, res);
};`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'SSE messages follow a simple text format: "event: eventName\\ndata: your data\\n\\n". The double newline signals the end of a message. The browser\'s EventSource API handles parsing automatically.',
        },
      ],
    },

    // ─── Section 22: Email Sending ───────────────────────────────────
    {
      id: 'email-sending',
      title: 'Email Sending',
      blocks: [
        {
          type: 'text',
          content:
            'Most apps need to send emails: welcome emails, password resets, order confirmations, etc. Use Nodemailer for sending and a template engine for pretty HTML emails.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'nodemailer',
              description: 'The standard Node.js library for sending emails via SMTP',
              url: 'https://www.npmjs.com/package/nodemailer',
            },
            {
              name: 'html-to-text',
              description: 'Convert HTML emails to plain text fallback for accessibility',
              url: 'https://www.npmjs.com/package/html-to-text',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Reusable Email Service Class',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'utils/email.js',
          code: `import nodemailer from 'nodemailer';
import { convert } from 'html-to-text';

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = \`Your App <\${process.env.EMAIL_FROM}>\`;
  }

  // Use different transports for dev vs production
  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Production: use a real service (SendGrid, Mailgun, SES, etc.)
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // Development: use Mailtrap to catch emails
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html), // plain text fallback
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const html = \`
      <h1>Welcome, \${this.firstName}!</h1>
      <p>We're glad to have you on board.</p>
      <a href="\${this.url}">Get Started</a>
    \`;
    await this.send('Welcome to Our App!', html);
  }

  async sendPasswordReset() {
    const html = \`
      <h1>Password Reset</h1>
      <p>Click below to reset your password (valid for 10 minutes):</p>
      <a href="\${this.url}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    \`;
    await this.send('Password Reset Request', html);
  }
}`,
        },
        {
          type: 'heading',
          content: 'Usage in Controllers',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'controllers/authController.js',
          code: `import { Email } from '../utils/email.js';

export const signup = async (req, res) => {
  const user = await User.create(req.body);
  const url = \`\${process.env.CLIENT_URL}/profile\`;

  await new Email(user, url).sendWelcome();

  res.status(201).json({ status: 'success', data: { user } });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'No user with that email' });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = \`\${process.env.CLIENT_URL}/reset-password/\${resetToken}\`;
  await new Email(user, resetURL).sendPasswordReset();

  res.status(200).json({ message: 'Reset link sent to email' });
};`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use Mailtrap (mailtrap.io) during development to catch all outgoing emails without sending them to real addresses. Switch to SendGrid, Mailgun, or AWS SES for production.',
        },
      ],
    },

    // ─── Section 23: Background Jobs & Queues ────────────────────────
    {
      id: 'background-jobs',
      title: 'Background Jobs & Queues',
      blocks: [
        {
          type: 'text',
          content:
            'Some tasks are too slow for a request-response cycle: sending emails, processing images, generating reports, etc. Move these to a background job queue so the user gets an instant response while the work happens asynchronously.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'bullmq',
              description: 'Modern Redis-based job queue for Node.js (successor to Bull)',
              url: 'https://www.npmjs.com/package/bullmq',
            },
            {
              name: 'node-cron',
              description: 'Simple cron-like scheduler for recurring tasks (no Redis needed)',
              url: 'https://www.npmjs.com/package/node-cron',
            },
          ],
        },
        {
          type: 'heading',
          content: 'BullMQ — Producer (Add Jobs)',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'queues/emailQueue.js',
          code: `import { Queue } from 'bullmq';

const emailQueue = new Queue('email', {
  connection: { host: 'localhost', port: 6379 },
});

// Add a job to the queue
export const queueEmail = async (to, subject, html) => {
  await emailQueue.add('sendEmail', { to, subject, html }, {
    attempts: 3,           // retry up to 3 times on failure
    backoff: {
      type: 'exponential',
      delay: 2000,         // 2s, 4s, 8s between retries
    },
    removeOnComplete: 100, // keep last 100 completed jobs
    removeOnFail: 50,      // keep last 50 failed jobs
  });
};`,
        },
        {
          type: 'heading',
          content: 'BullMQ — Worker (Process Jobs)',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'workers/emailWorker.js',
          code: `import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';

const worker = new Worker('email', async (job) => {
  const { to, subject, html } = job.data;

  const transporter = nodemailer.createTransport({ /* config */ });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log(\`Email sent to \${to}\`);
}, {
  connection: { host: 'localhost', port: 6379 },
  concurrency: 5, // process 5 jobs simultaneously
});

worker.on('failed', (job, err) => {
  console.error(\`Job \${job.id} failed: \${err.message}\`);
});`,
        },
        {
          type: 'heading',
          content: 'Simple Cron Jobs (No Redis)',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'cron/cleanupJob.js',
          code: `import cron from 'node-cron';

// Run every day at 2:00 AM — clean up expired tokens
cron.schedule('0 2 * * *', async () => {
  console.log('Running daily cleanup...');
  await Token.deleteMany({ expiresAt: { $lt: new Date() } });
});

// Cron format: second(optional) minute hour day-of-month month day-of-week
// '*/5 * * * *'  → every 5 minutes
// '0 9 * * 1'    → every Monday at 9 AM
// '0 0 1 * *'    → first day of every month at midnight`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'BullMQ requires Redis. For simple apps without Redis, node-cron works for scheduled tasks but doesn\'t support job retries or distributed processing.',
        },
      ],
    },

    // ─── Section 24: Webhooks ────────────────────────────────────────
    {
      id: 'webhooks',
      title: 'Webhooks',
      blocks: [
        {
          type: 'text',
          content:
            'Webhooks are HTTP callbacks — when an event happens in an external service (Stripe payment, GitHub push, Twilio SMS), that service sends a POST request to your server. Think of it as "don\'t call us, we\'ll call you."',
        },
        {
          type: 'heading',
          content: 'How Webhooks Work',
        },
        {
          type: 'list',
          items: [
            '1. You register a webhook URL with the external service (e.g., https://yourapp.com/api/webhooks/stripe)',
            '2. When an event occurs, the service sends a POST request to your URL with event data',
            '3. Your server receives the request, verifies it\'s authentic, and processes the event',
            '4. You respond with 200 OK to acknowledge receipt (otherwise the service retries)',
          ],
        },
        {
          type: 'heading',
          content: 'Building a Webhook Receiver',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'controllers/webhookController.js',
          code: `import crypto from 'crypto';

// Verify webhook signature to ensure it's from the expected sender
function verifySignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export const handleGitHubWebhook = (req, res) => {
  const signature = req.headers['x-hub-signature-256']?.replace('sha256=', '');

  if (!verifySignature(JSON.stringify(req.body), signature, process.env.GITHUB_WEBHOOK_SECRET)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = req.headers['x-github-event'];

  switch (event) {
    case 'push':
      console.log('New push to:', req.body.repository.full_name);
      // Trigger deployment, run tests, etc.
      break;
    case 'pull_request':
      console.log('PR action:', req.body.action);
      break;
    default:
      console.log('Unhandled event:', event);
  }

  res.status(200).json({ received: true });
};`,
        },
        {
          type: 'heading',
          content: 'Sending Webhooks from Your App',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'utils/webhook.js',
          code: `import crypto from 'crypto';

export async function sendWebhook(url, data, secret) {
  const payload = JSON.stringify(data);

  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': signature,
      'X-Webhook-Timestamp': Date.now().toString(),
    },
    body: payload,
  });

  if (!response.ok) {
    // Retry logic: queue for retry with exponential backoff
    throw new Error(\`Webhook failed: \${response.status}\`);
  }
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always verify webhook signatures. Without verification, anyone could send fake events to your webhook URL. Use HMAC-SHA256 with a shared secret.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use ngrok or Cloudflare Tunnel to expose your local server during development so external services can reach your webhook endpoints.',
        },
      ],
    },
    {
      id: 'ai-integration',
      title: 'AI / LLM Integration',
      blocks: [
        {
          type: 'text',
          content:
            'Integrating AI (ChatGPT, Claude, Gemini) into your Express backend is increasingly a standard feature. You call an AI provider\'s API from your server (never directly from the frontend — that exposes your API key) and stream the response back to the client.',
        },
        {
          type: 'heading',
          content: 'Why Call AI from the Backend?',
        },
        {
          type: 'list',
          items: [
            'Security — your API key stays on the server, never exposed to browser users',
            'Rate limiting — you control how many AI requests each user can make',
            'Cost control — log usage, limit tokens, cache repeated prompts',
            'Data enrichment — combine AI output with your own database before returning it',
            'Provider flexibility — swap OpenAI for Claude/Gemini without touching the frontend',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'terminal',
          code: `npm install openai          # OpenAI (GPT-4, GPT-4o, etc.)
npm install @anthropic-ai/sdk  # Anthropic (Claude)`,
        },
        {
          type: 'heading',
          content: 'Basic Chat Endpoint (OpenAI)',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'aiRoutes.js',
          code: `import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/ai/chat
router.post('/chat', authenticate, async (req, res) => {
  const { messages } = req.body; // array of { role, content } objects

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'messages array required' });
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',  // cheaper and fast — good default
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...messages,
    ],
    max_tokens: 1000,
  });

  res.json({
    reply: completion.choices[0].message.content,
    usage: completion.usage, // prompt_tokens, completion_tokens
  });
});`,
        },
        {
          type: 'heading',
          content: 'Streaming AI Responses (SSE)',
        },
        {
          type: 'text',
          content:
            'Streaming sends each word as it is generated instead of waiting for the full response. This makes the UI feel much more responsive — users see text appearing word by word like in ChatGPT.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'aiStream.js',
          code: `// Backend — stream OpenAI response as Server-Sent Events
router.post('/chat/stream', authenticate, async (req, res) => {
  const { messages } = req.body;

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...messages,
    ],
    stream: true, // enable streaming
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      // Send each token as an SSE event
      res.write(\`data: \${JSON.stringify({ content })}\n\n\`);
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
});`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ChatComponent.jsx',
          code: `// Frontend — consume the SSE stream
async function sendMessage(messages, onChunk) {
  const res = await fetch('/api/ai/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n').filter((l) => l.startsWith('data: '));

    for (const line of lines) {
      const data = line.replace('data: ', '');
      if (data === '[DONE]') return;

      const { content } = JSON.parse(data);
      onChunk(content); // append each word to UI state
    }
  }
}

function Chat() {
  const [reply, setReply] = useState('');

  const handleSend = async () => {
    setReply('');
    await sendMessage(
      [{ role: 'user', content: 'Explain async/await in one sentence.' }],
      (chunk) => setReply((prev) => prev + chunk)
    );
  };

  return (
    <div>
      <button onClick={handleSend}>Ask AI</button>
      <p>{reply}</p>
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Rate Limiting AI Endpoints',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'aiRateLimiter.js',
          code: `import rateLimit from 'express-rate-limit';

// AI calls are expensive — limit them more aggressively than normal endpoints
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // 10 AI requests per minute per IP
  message: { message: 'Too many AI requests, slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/chat', authenticate, aiRateLimiter, aiController.chat);
router.post('/chat/stream', authenticate, aiRateLimiter, aiController.stream);`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never put your OpenAI/Claude API key in the frontend — it will be visible to anyone who opens DevTools. Always proxy AI requests through your backend. Track token usage and set hard budget limits in your provider dashboard to avoid surprise bills.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use gpt-4o-mini or claude-haiku-4-5 as your default model — they are 10-20x cheaper than the flagship models and handle most tasks equally well. Only upgrade to GPT-4o or Claude Sonnet when you need complex reasoning or better instruction following.',
        },
      ],
    },
  ],
}

export default expressData
