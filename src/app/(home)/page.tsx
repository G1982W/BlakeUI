import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
import { Dashboard18 } from "@/components/dashboard-18";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full lg:p-4 bg-surface">
        <div
          className="w-full pt-20 rounded-[36px] flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, #FAF9F6 0%, #FFFFFF 53.5%, #FFFFFF 100%), linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #FFFFFF 53.5%, #FAF9F6 100%)",
            backgroundBlendMode: "multiply",
          }}
        >
          {/* Hero Section */}
          <section className="flex flex-col items-center px-4 pt-16 pb-12 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Built for Scale. Designed for Complexity.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              BlakeUI is the enterprise UI library built for scale —
              production-ready components designed for complex, data-heavy
              applications.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-8">
              <Link href="/docs" className="cursor-pointer">
                View Components
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </section>

          {/* Dashboard Preview */}
          <section className="w-full max-w-7xl px-4 pb-16">
            <div className="overflow-hidden rounded-2xl bg-background">
              {/* Dashboard Content */}
              <div
                className="overflow-hidden h-[620px]"
                style={{ transform: "scale(1)" }}
              >
                <Dashboard18 className="min-h-0! h-full!" />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            id="pricing"
            className="mx-auto w-full max-w-[1570px] rounded-[36px] px-4 py-24"
          >
            <div className="mx-auto max-w-[642px] gap-[18px] text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Easy, one time pricing
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Get lifetime access to 100+ blakeUI components for a one-time
                payment.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="mx-auto mt-10 flex md:flex-row flex-col items-start justify-center gap-2.5">
              {/* Free Plan */}
              <div className="flex lg:w-[310px] w-full flex-col gap-2.5 rounded-[12px] border border-border bg-background px-6 py-5">
                <p className="text-xs text-muted-foreground">Free</p>
                <p className="text-[17px] font-normal leading-[140%] tracking-[-0.01em] text-foreground">
                  $0
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    50+ customized components
                  </li>
                </ul>
              </div>

              {/* Startup Plan */}
              <div className="flex lg:w-[310px] w-full flex-col gap-2.5 rounded-[12px] border-2 border-border bg-background px-6 py-5">
                <p className="text-xs font-medium text-foreground">Startup</p>
                <p className="text-[17px] font-normal leading-[140%] tracking-[-0.01em] text-foreground">
                  $99
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    100+ components
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    One time payment
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                    Lifetime updates
                  </li>
                </ul>
                <button className="mt-3 w-fit rounded-button border border-brand bg-brand px-4 py-1.5 text-xs font-medium text-white">
                  Buy Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative w-full mx-auto overflow-hidden bg-surface px-4 py-[90px]">
        <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Get started today
          </h2>
          <p className="mt-3 max-w-[474px] text-[21px] font-normal leading-[115%] tracking-[0.01em] text-muted-foreground">
            Mainline is the fit-for-purpose tool for planning
            <br />
            and building modern software products.
          </p>
          <Button asChild variant="secondary" size="lg" className="mt-6">
            <Link href="/docs">
              View Components
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Blake/UI Watermark Footer */}
      <section className="w-full bg-surface">
        <svg
          className="w-full h-auto"
          width="1600"
          height="293"
          viewBox="0 0 1600 293"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Union"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.343 1.1114C119.107 -0.370464 122.42 -0.370468 125.185 1.1114L266.525 76.8829C269.603 78.533 271.527 81.7633 271.527 85.2803V235.494C271.527 239.011 269.603 242.242 266.525 243.892L125.185 319.662C122.42 321.144 119.107 321.144 116.343 319.662L-24.998 243.892C-28.0761 242.242 -30 239.011 -30 235.494V85.2803C-30 81.7632 -28.076 78.533 -24.998 76.8829L116.343 1.1114ZM1255.06 320.774H1212.21L1318.75 7.04154e-05H1360.83L1255.06 320.774ZM-6.44336 93.8536V226.921L120.764 295.115L247.971 226.921V93.8536L120.764 25.6593L-6.44336 93.8536ZM417.631 123.535C422.829 115.418 429.133 108.722 436.545 103.451C448.382 94.9591 462.408 90.712 478.62 90.712C496.119 90.7121 511.302 94.9591 524.169 103.451C537.293 111.686 547.458 123.395 554.663 138.578C562.126 153.504 565.857 171.26 565.857 191.847C565.857 212.177 562.126 229.933 554.663 245.116C547.458 260.299 537.293 272.138 524.169 280.63C511.302 288.865 496.119 292.981 478.62 292.982C462.408 292.982 448.382 288.865 436.545 280.63C428.916 275.035 422.459 267.987 417.176 259.488L415.314 288.35H374.397V18.1426H417.631V123.535ZM740.316 90.712C759.102 90.7121 774.8 94.4436 787.409 101.906C800.019 109.112 809.282 119.535 815.201 133.174C821.377 146.813 824.466 163.283 824.466 182.583L823.308 288.35H783.549L782.283 264.561C781.117 266.66 779.866 268.671 778.53 270.593C767.979 285.518 751.124 292.981 727.964 292.982C704.804 292.982 686.79 287.835 673.923 277.541C661.313 267.247 655.008 252.708 655.008 233.922C655.008 213.85 661.699 198.538 675.08 187.987C688.719 177.437 707.634 172.16 731.823 172.16H780.688C779.984 166.266 778.879 160.99 777.373 156.334C774.8 147.327 770.424 140.508 764.248 135.876C758.329 130.987 750.352 128.541 740.316 128.541C731.052 128.541 722.945 130.471 715.997 134.331C709.049 138.191 703.131 144.239 698.241 152.474L660.412 138.578C664.529 130.086 669.933 122.237 676.624 115.031C683.572 107.569 692.194 101.649 702.487 97.2745C713.038 92.8999 725.648 90.712 740.316 90.712ZM1119.5 90.712C1136.74 90.7121 1152.31 95.216 1166.2 104.223C1180.1 112.972 1191.04 125.711 1199.01 142.438C1207.25 159.165 1211.37 179.109 1211.37 202.27H1065.64C1066.32 211.863 1068.83 220.356 1073.18 227.746C1078.32 236.238 1085.14 242.801 1093.63 247.433C1102.13 252.065 1111.52 254.381 1121.81 254.381C1133.65 254.381 1143.43 251.807 1151.15 246.66C1158.87 241.256 1164.92 234.308 1169.29 225.816L1207.51 242.028C1202.1 252.322 1195.16 261.329 1186.66 269.049C1178.43 276.769 1168.52 282.688 1156.94 286.806C1145.62 290.923 1132.62 292.981 1117.95 292.982C1099.17 292.981 1082.44 288.735 1067.77 280.243C1053.36 271.494 1041.91 259.528 1033.42 244.345C1025.18 229.162 1021.07 211.662 1021.07 191.847C1021.07 172.032 1025.31 154.533 1033.8 139.35C1042.3 124.167 1053.88 112.329 1068.54 103.837C1083.47 95.0876 1100.45 90.712 1119.5 90.712ZM1415.43 194.163C1415.43 209.346 1417.23 221.184 1420.83 229.676C1424.44 238.168 1429.33 244.087 1435.5 247.433C1441.94 250.778 1449.27 252.45 1457.51 252.45C1472.17 252.707 1483.5 247.947 1491.47 238.168C1499.45 228.389 1503.44 214.364 1503.44 196.093V95.3448H1546.29V288.35H1505.76L1503.99 261.273C1498.83 269.673 1492.47 276.512 1484.91 281.787C1474.1 289.25 1460.98 292.981 1445.54 292.982C1430.36 292.981 1417.23 289.894 1406.17 283.718C1395.36 277.542 1386.99 267.891 1381.08 254.767C1375.16 241.642 1372.2 224.787 1372.2 204.199V95.3448H1415.43V194.163ZM631.947 288.35H588.714V18.1426H631.947V288.35ZM897.355 173.913L969.539 95.3448H1021.65L949.035 175.287L1028.21 288.35H976.873L921.01 206.141L897.355 232.183V288.35H854.122V18.1426H897.355V173.913ZM1625.75 288.35H1582.91V95.3448H1625.75V288.35ZM745.72 205.357C728.479 205.358 716.384 207.802 709.436 212.691C702.487 217.324 699.013 224.014 699.013 232.764C699.013 240.227 701.973 246.146 707.892 250.521C714.068 254.638 722.56 256.697 733.368 256.697C743.147 256.697 751.639 254.51 758.845 250.135C766.05 245.76 771.582 239.969 775.442 232.764C779.431 225.783 781.488 217.958 781.612 209.287L781.619 208.445V205.357H745.72ZM468.197 130.472C458.419 130.472 449.669 133.045 441.949 138.191C434.229 143.338 428.181 150.544 423.807 159.809C419.689 169.073 417.631 179.752 417.631 191.847C417.631 203.942 419.689 214.622 423.807 223.886C428.181 233.15 434.1 240.485 441.562 245.889C449.283 251.035 458.033 253.608 467.812 253.608C478.105 253.608 487.24 251.035 495.218 245.889C503.195 240.485 509.501 233.15 514.133 223.886C519.022 214.622 521.467 203.942 521.467 191.847C521.467 179.752 519.15 169.073 514.519 159.809C510.144 150.545 503.968 143.338 495.99 138.191C488.013 133.045 478.748 130.472 468.197 130.472ZM120.102 74.3848C122.012 74.2019 123.842 75.2066 124.728 76.9249L195.271 213.864C196.078 215.431 195.958 217.321 194.959 218.772L186.305 231.332C185.306 232.782 183.591 233.554 181.854 233.336L75.543 219.997C74.1676 219.825 72.9374 219.049 72.1797 217.878L64.7363 206.376C63.9786 205.205 63.7705 203.756 64.167 202.416L100.618 79.2335C101.167 77.3779 102.777 76.0434 104.688 75.8604L120.102 74.3848ZM90.0977 197.868L165.345 207.31L115.776 111.088L90.0977 197.868ZM1118.34 127.77C1110.62 127.77 1102.9 129.571 1095.18 133.174C1087.46 136.519 1081.03 141.666 1075.88 148.614C1071.64 154.125 1069.15 160.944 1068.4 169.072H1164.83C1164.16 160.944 1161.91 154.125 1158.1 148.614C1153.47 141.666 1147.55 136.519 1140.34 133.174C1133.39 129.571 1126.06 127.77 1118.34 127.77ZM1604.52 8.10652C1611.47 8.10661 1617.39 10.5511 1622.28 15.4405C1627.43 20.3299 1630 26.2493 1630 33.1973C1630 40.1451 1627.43 46.1924 1622.28 51.3389C1617.39 56.2283 1611.47 58.6738 1604.52 58.6739C1597.58 58.6738 1591.53 56.2282 1586.38 51.3389C1581.49 46.1922 1579.05 40.1453 1579.05 33.1973C1579.05 26.2491 1581.49 20.33 1586.38 15.4405C1591.53 10.5513 1597.58 8.10657 1604.52 8.10652Z"
            fill="url(#paint0_linear_2058_3648)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2058_3648"
              x1="120.763"
              y1="9.62355"
              x2="120.763"
              y2="311.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F3F2EF" />
              <stop offset="1" stopColor="#F9F8F6" />
            </linearGradient>
          </defs>
        </svg>
      </section>
    </div>
  );
}
