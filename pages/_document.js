import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />

      <title>Javascript Tutorial</title>
      <meta content="" name="descriptison" />
      <meta content="" name="keywords" />

      {/* <!-- Favicons --> */}
      <link href="/assets/img/favicon.png" rel="icon" />
      <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

      {/* <!-- Google Fonts --> */}
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

      {/* <!-- Vendor CSS Files --> */}
      <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/assets/vendor/icofont/icofont.min.css" rel="stylesheet" />
      <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
      <link href="/assets/vendor/animate.css/animate.min.css" rel="stylesheet" />
      <link href="/assets/vendor/venobox/venobox.css" rel="stylesheet" />
      <link href="/assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet" />
      <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
      <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />

      {/* <!-- Template Main CSS File --> */}
      <link href="/assets/css/style.css" rel="stylesheet" />

      <body>
        <Main />
        <NextScript />
      </body>

      <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

      {/* <!-- Vendor JS Files --> */}
      <script src="/assets/vendor/jquery/jquery.min.js"></script>
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/vendor/jquery.easing/jquery.easing.min.js"></script>
      <script src="/assets/vendor/php-email-form/validate.js"></script>
      <script src="/assets/vendor/jquery-sticky/jquery.sticky.js"></script>
      <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="/assets/vendor/venobox/venobox.min.js"></script>
      <script src="/assets/vendor/waypoints/jquery.waypoints.min.js"></script>
      <script src="/assets/vendor/owl.carousel/owl.carousel.min.js"></script>
      <script src="/assets/vendor/aos/aos.js"></script>

      {/* <!-- Template Main JS File --> */}
      <script src="/assets/js/main.js"></script>

    </Html>
  );
}