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
  ],
}

export default expressData
