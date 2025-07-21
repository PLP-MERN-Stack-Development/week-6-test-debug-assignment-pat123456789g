const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress;

  // Log request
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);

  // Capture response time
  const startTime = Date.now();

  // Override res.end to log response details
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const statusCode = res.statusCode;
    
    console.log(`[${timestamp}] ${method} ${url} - ${statusCode} - ${responseTime}ms`);
    
    originalEnd.call(res, chunk, encoding);
  };

  next();
};

module.exports = logger;
