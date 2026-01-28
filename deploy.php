<?php
// GitHub Webhook Deploy Script
// Configure webhook at: GitHub repo -> Settings -> Webhooks -> Add webhook
// Payload URL: https://renta.net/deploy.php
// Content type: application/json
// Secret: (copy .env.example to .env and set your secret)

$env = parse_ini_file(__DIR__ . '/.env');
$secret = $env['DEPLOY_SECRET'] ?? '';

$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');

if (!$signature || !$payload) {
    http_response_code(400);
    exit('Missing signature or payload');
}

$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    exit('Invalid signature');
}

// Verify it's a push event
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';
if ($event !== 'push') {
    exit('Ignored: ' . $event);
}

// Run git pull
chdir(__DIR__);
putenv('HOME=/srv/renta.net');
$output = [];
$return = 0;
exec('git pull 2>&1', $output, $return);

$log = date('Y-m-d H:i:s') . " - Deploy triggered\n";
$log .= implode("\n", $output) . "\n";
$log .= "Exit code: $return\n\n";

file_put_contents('/tmp/rentanet-deploy.log', $log, FILE_APPEND);

echo $return === 0 ? 'OK' : 'FAILED';
