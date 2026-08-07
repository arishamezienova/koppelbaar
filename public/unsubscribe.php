<?php
// Handles unsubscribe requests from /[locale]/unsubscribe.
// Sends a notification mail to Koppelbaar with the address that wants out.

header("Content-Type: application/json; charset=utf-8");

// Only accept POST.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "method_not_allowed"]);
    exit;
}

$email  = isset($_POST["email"]) ? trim($_POST["email"]) : "";
$locale = isset($_POST["locale"]) ? trim($_POST["locale"]) : "";
$locale = in_array($locale, ["nl", "en"], true) ? $locale : "nl";

// Validate the e-mail address.
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "invalid_email"]);
    exit;
}

$to      = "hello@koppelbaar.agency";
$from    = "support@koppelbaar.agency";
$subject = "Uitschrijving nieuwsbrief";

$body =
    "Een gebruiker heeft zich uitgeschreven via de website.\n\n" .
    "E-mailadres: " . $email . "\n" .
    "Taal: " . $locale . "\n" .
    "Tijdstip: " . date("Y-m-d H:i:s") . "\n" .
    "IP: " . ($_SERVER["REMOTE_ADDR"] ?? "onbekend") . "\n\n" .
    "Verwijder dit adres uit de mailinglijst.";

$headers  = "From: Koppelbaar <" . $from . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "mail_failed"]);
}
