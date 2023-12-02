import { useContext } from 'react';
import Link from 'next/link';
import { BrandContext } from '../lib/context';

const shapes = {
  null:
    'M49.9035 30.38C57.9047 30.38 64.391 23.9441 64.391 16.005C64.391 8.06591 57.9047 1.63 49.9035 1.63C41.9023 1.63 35.416 8.06591 35.416 16.005C35.416 23.9441 41.9023 30.38 49.9035 30.38ZM49.9035 32.005C58.8092 32.005 66.0287 24.8416 66.0287 16.005C66.0287 7.16845 58.8092 0.00500488 49.9035 0.00500488C40.9978 0.00500488 33.7783 7.16845 33.7783 16.005C33.7783 24.8416 40.9978 32.005 49.9035 32.005Z',
  beyonder:
    'M66.7946 16.005L62.2156 12.0112L63.5473 6.11767L57.4654 5.55247L55.0437 0.00500488L49.7876 3.08499L44.5314 0.00500488L42.1097 5.55247L36.0279 6.11767L37.3595 12.0137L32.7805 16.005L37.3595 19.9988L36.0279 25.8923L42.1097 26.4575L44.5314 32.005L49.7876 28.925L55.0437 32.005L57.4654 26.4575L63.5473 25.8923L62.2156 19.9988L66.7946 16.005ZM56.4056 25.0184L54.3188 29.799L49.7876 27.1423L45.2564 29.799L43.1695 25.0184L37.9285 24.5304L39.0764 19.451L35.1292 16.005L39.0764 12.5615L37.9285 7.48213L43.1695 6.99411L45.2564 2.21353L49.7876 4.87024L54.3188 2.21353L56.4056 6.99411L61.6467 7.48213L60.4988 12.5615L64.446 16.005L60.4988 19.4485L61.6467 24.5279L56.4056 25.0184Z',
  bloomer:
    '"M66.0387 16.0044C66.0387 15.3632 65.2392 15.1612 64.0297 14.8558C63.7742 14.7901 63.42 14.7018 63.1366 14.6134C63.3997 14.467 63.7388 14.3004 63.9817 14.1817C65.0899 13.6389 65.8211 13.2805 65.6896 12.6619C65.558 12.0359 64.7357 12.0056 63.4908 11.9551C63.2251 11.945 62.8557 11.9298 62.5597 11.9046C62.7849 11.7077 63.0809 11.4754 63.2934 11.3088C64.2651 10.5464 64.9077 10.0415 64.6471 9.46083C64.3865 8.87766 63.5768 9.01903 62.3522 9.23109C62.089 9.27653 61.7247 9.33965 61.4287 9.37499C61.6083 9.13516 61.8461 8.84736 62.0182 8.64287C62.8102 7.69364 63.3339 7.06503 62.9594 6.55003C62.585 6.03502 61.8234 6.34049 60.6696 6.79995C60.4216 6.89841 60.0775 7.03726 59.7941 7.1332C59.9206 6.86307 60.0927 6.53236 60.2192 6.29757C60.7986 5.20192 61.1807 4.4799 60.705 4.05325C60.2318 3.62661 59.5512 4.08102 58.5189 4.77022C58.2962 4.91917 57.985 5.12618 57.7294 5.27766C57.7952 4.98733 57.8964 4.63137 57.9698 4.37387C58.3089 3.18228 58.5341 2.39463 57.9799 2.07401C57.4283 1.75592 56.859 2.34161 55.9937 3.2252C55.8065 3.41707 55.5433 3.68467 55.3232 3.88916C55.3283 3.59126 55.351 3.22268 55.3687 2.9576C55.4522 1.71805 55.5054 0.900099 54.8981 0.703184C54.2934 0.50627 53.8582 1.19799 53.2003 2.24063C53.0561 2.46784 52.8562 2.78593 52.6816 3.03334C52.6234 2.74301 52.5703 2.37948 52.5323 2.11945C52.3527 0.887476 52.2338 0.0745729 51.5961 0.00893477C50.9636 -0.0567034 50.6853 0.705709 50.2602 1.85943C50.1666 2.11693 50.0325 2.47541 49.9135 2.75311C49.7921 2.47541 49.6605 2.1144 49.5669 1.85943C49.1418 0.705709 48.861 -0.0567034 48.2309 0.00893477C47.5933 0.0745729 47.4744 0.887476 47.2947 2.11945C47.2568 2.37948 47.2037 2.74301 47.1455 3.03334C46.9709 2.78846 46.771 2.47036 46.6268 2.24063C45.9689 1.19799 45.5337 0.508794 44.929 0.703184C44.3217 0.900099 44.3748 1.71805 44.4583 2.9576C44.4761 3.22268 44.5014 3.59126 44.5039 3.88916C44.2838 3.68467 44.0206 3.41707 43.8334 3.2252C42.9706 2.34161 42.3987 1.75592 41.8471 2.07401C41.2955 2.3921 41.5182 3.17976 41.8573 4.37387C41.9306 4.62885 42.0318 4.98733 42.0976 5.27766C41.8395 5.12366 41.5309 4.91665 41.3082 4.77022C40.2784 4.08355 39.5978 3.62913 39.1221 4.05325C38.6489 4.4799 39.031 5.20192 39.6079 6.29757C39.7319 6.53236 39.9064 6.86307 40.033 7.1332C39.7496 7.03726 39.4055 6.89841 39.1575 6.79995C38.0062 6.34049 37.2446 6.03502 36.8676 6.55003C36.4932 7.06251 37.0169 7.69112 37.8089 8.64287C37.9809 8.84988 38.2188 9.13516 38.3984 9.37499C38.1024 9.33965 37.7355 9.27653 37.4749 9.23109C36.2503 9.01903 35.4406 8.88018 35.18 9.46083C34.9219 10.0415 35.562 10.5439 36.5336 11.3088C36.7462 11.4754 37.0397 11.7077 37.2674 11.9046C36.9714 11.9324 36.602 11.945 36.3363 11.9551C35.0914 12.003 34.2691 12.0359 34.1375 12.6619C34.0059 13.2805 34.7372 13.6389 35.8454 14.1817C36.0883 14.3004 36.4274 14.467 36.6905 14.6134C36.4071 14.6993 36.0529 14.7901 35.7973 14.8558C34.5879 15.1612 33.7883 15.3657 33.7883 16.0044C33.7883 16.6457 34.5879 16.8476 35.7973 17.1531C36.0529 17.2187 36.4071 17.3071 36.6905 17.3955C36.4274 17.5419 36.0883 17.7085 35.8454 17.8272C34.7372 18.3699 34.0059 18.7284 34.1375 19.3469C34.2691 19.973 35.0914 20.0033 36.3363 20.0538C36.602 20.0639 36.9714 20.0791 37.2674 20.1043C37.0422 20.3012 36.7462 20.5335 36.5336 20.7001C35.562 21.4625 34.9193 21.9674 35.18 22.5481C35.4406 23.1312 36.2503 22.9898 37.4749 22.7778C37.738 22.7323 38.1024 22.6692 38.3984 22.6339C38.2188 22.8737 37.9809 23.1615 37.8089 23.366C37.0169 24.3152 36.4932 24.9438 36.8676 25.4589C37.2421 25.9739 38.0037 25.6684 39.1575 25.2089C39.4055 25.1105 39.7496 24.9716 40.033 24.8757C39.9064 25.1458 39.7344 25.4765 39.6079 25.7113C39.0285 26.807 38.6464 27.529 39.1221 27.9556C39.5952 28.3823 40.2759 27.9279 41.3082 27.2387C41.5309 27.0897 41.8421 26.8827 42.0976 26.7312C42.0318 27.0215 41.9306 27.3775 41.8573 27.635C41.5182 28.8266 41.293 29.6143 41.8471 29.9349C42.3987 30.253 42.968 29.6673 43.8334 28.7837C44.0206 28.5918 44.2838 28.3242 44.5039 28.1197C44.4988 28.4176 44.4761 28.7862 44.4583 29.0513C44.3748 30.2908 44.3217 31.1088 44.929 31.3057C45.5337 31.5026 45.9689 30.8109 46.6268 29.7682C46.771 29.541 46.9709 29.223 47.1455 28.9755C47.2037 29.2659 47.2568 29.6294 47.2947 29.8894C47.4744 31.1214 47.5933 31.9343 48.2309 31.9999C48.861 32.0656 49.1418 31.3032 49.5669 30.1495C49.6605 29.892 49.7946 29.5335 49.9135 29.2558C50.035 29.5335 50.1666 29.8945 50.2602 30.1495C50.6675 31.2577 50.9433 32.005 51.5228 32.005C51.5455 32.005 51.5708 32.0025 51.5961 31.9999C52.2338 31.9343 52.3527 31.1214 52.5323 29.8894C52.5703 29.6294 52.6234 29.2659 52.6816 28.9755C52.8562 29.2204 53.0561 29.5385 53.2003 29.7682C53.8582 30.8109 54.2909 31.5001 54.8981 31.3057C55.5054 31.1088 55.4522 30.2908 55.3687 29.0513C55.351 28.7862 55.3257 28.4176 55.3232 28.1197C55.5433 28.3242 55.8065 28.5918 55.9937 28.7837C56.8565 29.6673 57.4283 30.253 57.9799 29.9349C58.5315 29.6168 58.3089 28.8291 57.9698 27.635C57.8964 27.38 57.7952 27.0215 57.7294 26.7312C57.9875 26.8852 58.2962 27.0922 58.5189 27.2387C59.5487 27.9253 60.2319 28.3798 60.7025 27.9556C61.1756 27.529 60.7936 26.807 60.2167 25.7113C60.0927 25.4765 59.9181 25.1458 59.7916 24.8757C60.075 24.9716 60.4191 25.1105 60.6671 25.2089C61.8183 25.6684 62.5799 25.9739 62.9569 25.4589C63.3314 24.9464 62.8076 24.3178 62.0157 23.366C61.8436 23.159 61.6058 22.8737 61.4261 22.6339C61.7222 22.6692 62.089 22.7323 62.3497 22.7778C63.5743 22.9898 64.384 23.1287 64.6446 22.5481C64.9027 21.9674 64.2625 21.465 63.2909 20.7001C63.0784 20.5335 62.7849 20.3012 62.5571 20.1043C62.8532 20.0765 63.2226 20.0639 63.4883 20.0538C64.7331 20.0058 65.5555 19.973 65.687 19.3469C65.8186 18.7284 65.0874 18.3699 63.9791 17.8272C63.7362 17.7085 63.3972 17.5419 63.134 17.3955C63.4174 17.3096 63.7716 17.2187 64.0272 17.1531C65.2392 16.8476 66.0387 16.6457 66.0387 16.0044ZM61.8006 17.2541C61.7399 17.8448 62.4154 18.1781 63.5363 18.7259C63.7059 18.8092 63.9209 18.9152 64.1234 19.0187C63.888 19.0339 63.6401 19.044 63.4478 19.0516C62.2105 19.0995 61.4641 19.1298 61.2819 19.6903C61.0972 20.2558 61.6893 20.7178 62.6685 21.4877C62.8177 21.6039 63.0075 21.7528 63.1846 21.9018C62.9519 21.8664 62.709 21.826 62.5192 21.7932C61.2971 21.5812 60.5608 21.4549 60.2647 21.9649C59.9662 22.4774 60.4469 23.053 61.2439 24.0098C61.3654 24.1562 61.5223 24.343 61.6665 24.5248C61.4464 24.444 61.2186 24.3531 61.0415 24.2799C59.8877 23.8204 59.1919 23.5402 58.7972 23.9795C58.4 24.4187 58.7491 25.0802 59.3286 26.1783C59.4171 26.3475 59.5335 26.5646 59.6372 26.7741C59.4399 26.6504 59.2349 26.5141 59.0781 26.4081C58.0432 25.7189 57.4208 25.3023 56.94 25.6507C56.4618 25.9991 56.6667 26.7186 57.0033 27.9077C57.0564 28.092 57.1222 28.3293 57.1804 28.5539C57.0134 28.3924 56.8439 28.2182 56.7123 28.0819C55.8444 27.1907 55.3181 26.6555 54.7766 26.8953C54.2377 27.1351 54.2858 27.8799 54.3693 29.1119C54.3819 29.3037 54.3997 29.5486 54.4072 29.7834C54.2807 29.5915 54.1517 29.3896 54.0505 29.228C53.385 28.1753 52.9852 27.5391 52.4033 27.6603C51.8264 27.7814 51.7201 28.5186 51.5405 29.738C51.5126 29.9298 51.4772 30.1772 51.4367 30.4095C51.3533 30.1974 51.2697 29.9727 51.204 29.796C50.7713 28.6246 50.5132 27.9178 49.9135 27.9178C49.3164 27.9178 49.0558 28.6246 48.6231 29.796C48.5573 29.9727 48.4764 30.1974 48.3903 30.4095C48.3498 30.1772 48.3144 29.9298 48.2866 29.738C48.1095 28.5186 48.0007 27.7814 47.4238 27.6603C47.3757 27.6502 47.3302 27.6451 47.2821 27.6451C46.7735 27.6451 46.3839 28.2611 45.7741 29.228C45.6729 29.387 45.5463 29.5915 45.4173 29.7809C45.4274 29.5461 45.4426 29.3012 45.4553 29.1093C45.5362 27.8774 45.5868 27.1326 45.0479 26.8928C44.5064 26.6504 43.9801 27.1882 43.1123 28.0793C42.9807 28.2157 42.8112 28.3898 42.6442 28.5514C42.7024 28.3242 42.7707 28.0894 42.8213 27.9051C43.1603 26.7136 43.3653 25.9941 42.8845 25.6482C42.4038 25.2998 41.7814 25.7164 40.7465 26.4056C40.5871 26.5116 40.3847 26.6479 40.1873 26.7716C40.291 26.5621 40.4049 26.345 40.496 26.1758C41.0754 25.0802 41.4246 24.4162 41.0273 23.9769C40.6301 23.5377 39.9343 23.8154 38.7805 24.2774C38.6034 24.3481 38.3731 24.4389 38.1555 24.5222C38.2997 24.3405 38.4566 24.1537 38.5781 24.0072C39.3726 23.053 39.8533 22.4774 39.5573 21.9624C39.2612 21.4524 38.5224 21.5786 37.3028 21.7907C37.1131 21.8235 36.8702 21.8664 36.6399 21.8993C36.817 21.7528 37.0093 21.6039 37.1561 21.4852C38.1353 20.7152 38.7248 20.2507 38.5426 19.6877C38.3605 19.1273 37.6141 19.097 36.3768 19.049C36.1845 19.0415 35.9365 19.0314 35.7012 19.0162C35.9036 18.9102 36.1212 18.8042 36.2882 18.7234C37.4091 18.173 38.0872 17.8423 38.0239 17.2516C37.9632 16.6659 37.2421 16.4841 36.0453 16.1812C35.853 16.1332 35.6025 16.0701 35.3672 16.0019C35.6 15.9363 35.8505 15.8732 36.0453 15.8227C37.2421 15.5197 37.9632 15.338 38.0239 14.7523C38.0847 14.1615 37.4091 13.8283 36.2882 13.2805C36.1187 13.1971 35.9036 13.0911 35.7012 12.9876C35.9365 12.9725 36.1845 12.9624 36.3768 12.9548C37.6141 12.9068 38.3605 12.8765 38.5426 12.3161C38.7274 11.7506 38.1353 11.2886 37.1561 10.5186C37.0068 10.4025 36.817 10.2535 36.6399 10.1046C36.8727 10.1399 37.1156 10.1803 37.3054 10.2131C38.5275 10.4252 39.2638 10.5514 39.5598 10.0415C39.8584 9.52899 39.3776 8.95339 38.5806 7.99659C38.4592 7.85017 38.3023 7.66335 38.158 7.48158C38.3782 7.56237 38.6059 7.65325 38.783 7.72646C39.9368 8.18593 40.6326 8.46615 41.0273 8.02688C41.4246 7.58761 41.0754 6.92618 40.496 5.82801C40.4074 5.65886 40.291 5.44175 40.1873 5.23222C40.3847 5.35592 40.5871 5.49224 40.7465 5.59827C41.7814 6.28747 42.4038 6.70402 42.8845 6.35564C43.3627 6.00725 43.1578 5.28775 42.8213 4.09869C42.7681 3.9144 42.7024 3.6771 42.6442 3.45241C42.8112 3.61398 42.9807 3.78817 43.1123 3.9245C43.9801 4.81566 44.5064 5.35087 45.0479 5.11103C45.5868 4.8712 45.5388 4.12646 45.4553 2.89449C45.4426 2.70262 45.4249 2.45774 45.4173 2.22296C45.5438 2.41483 45.6729 2.61679 45.7741 2.77583C46.4395 3.82857 46.8393 4.46475 47.4212 4.34358C47.9981 4.2224 48.1069 3.48523 48.2841 2.26588C48.3119 2.07401 48.3473 1.82661 48.3878 1.59435C48.4713 1.80641 48.5548 2.03109 48.6206 2.20781C49.0533 3.3792 49.3113 4.08607 49.911 4.08607C50.5081 4.08607 50.7688 3.3792 51.2014 2.20781C51.2672 2.03109 51.3482 1.80641 51.4342 1.59435C51.4747 1.82661 51.5101 2.07401 51.5379 2.26588C51.7151 3.48523 51.8239 4.2224 52.4008 4.34358C52.9827 4.46728 53.385 3.83109 54.0479 2.77583C54.1491 2.61679 54.2757 2.4123 54.4047 2.22043C54.3946 2.45522 54.3794 2.7001 54.3668 2.89196C54.2858 4.12394 54.2352 4.86868 54.7741 5.10851C55.3181 5.35087 55.8419 4.81314 56.7098 3.92198C56.8413 3.78565 57.0109 3.61146 57.1779 3.44988C57.1197 3.67709 57.0513 3.91188 57.0007 4.09617C56.6617 5.28776 56.4567 6.00725 56.9375 6.35311C57.4182 6.7015 58.0407 6.28495 59.0755 5.59575C59.2349 5.48972 59.4374 5.35339 59.6347 5.22969C59.531 5.43923 59.4171 5.65634 59.326 5.82548C58.7466 6.92113 58.3974 7.58509 58.7947 8.02436C59.1919 8.46363 59.8877 8.18593 61.039 7.72394C61.2161 7.65325 61.4464 7.56237 61.664 7.47906C61.5197 7.66082 61.3629 7.84764 61.2414 7.99406C60.4469 8.94834 59.9662 9.52394 60.2622 10.0364C60.5582 10.5464 61.2971 10.4202 62.5167 10.2081C62.7064 10.1753 62.9493 10.1324 63.1796 10.0995C63.0025 10.246 62.8102 10.3949 62.6634 10.5136C61.6842 11.2835 61.0947 11.7481 61.2768 12.311C61.459 12.8715 62.2054 12.9018 63.4427 12.9497C63.635 12.9573 63.883 12.9674 64.1183 12.9826C63.9159 13.0886 63.6983 13.1946 63.5313 13.2754C62.4104 13.8258 61.7323 14.1565 61.7955 14.7472C61.8563 15.3329 62.5774 15.5147 63.7742 15.8176C63.9665 15.8656 64.217 15.9287 64.4523 15.9969C64.2195 16.0625 63.969 16.1256 63.7742 16.1761C62.585 16.4866 61.8638 16.6684 61.8006 17.2541Z"',
  maker:
    'M35.5167 1.505V30.2975H64.5345V1.505H35.5167ZM62.9623 28.7375H37.0864V3.0625H62.9623V28.7375Z',
  original:
    'M49.9035 0.00500488C40.9971 0.00500488 33.7783 16.005 33.7783 16.005C33.7783 16.005 40.9971 32.005 49.9035 32.005C58.8099 32.005 66.0287 16.005 66.0287 16.005C66.0287 16.005 58.8099 0.00500488 49.9035 0.00500488ZM49.9035 30.4455C45.9768 30.4455 42.2439 26.4667 39.8032 23.1303C37.6749 20.2212 36.1384 17.2671 35.5163 16.005C36.1334 14.7504 37.6547 11.8238 39.773 8.91973C42.2213 5.56328 45.9642 1.56451 49.9035 1.56451C53.8303 1.56451 57.5631 5.54327 60.0038 8.87973C62.1322 11.7888 63.6686 14.7429 64.2908 16.005C63.6686 17.2696 62.1322 20.2212 60.0038 23.1303C57.5631 26.4692 53.8303 30.4455 49.9035 30.4455Z',
  outsider:
    'M65.9935 21.5375L56.2906 0.00500488L48.9386 7.69749L35.7688 1.535V31.9725L48.9386 25.8125V31.975L65.9935 21.5375ZM48.2683 24.405L37.341 29.5175V3.99499L48.2683 9.1075L49.2963 9.58749L50.0774 8.77L55.8144 2.7675L63.998 20.9275L50.5082 29.1825V25.8125V23.355L48.2683 24.405Z',
  timeliner:
    'M65.9433 17.7557L64.3152 17.5799C64.3719 17.0632 64.401 16.5378 64.401 16.005C64.401 15.4722 64.3719 14.9468 64.3152 14.4301L65.9433 14.2543C66.0064 14.8292 66.0387 15.4134 66.0387 16.005C66.0387 16.5966 66.0064 17.1808 65.9433 17.7557ZM65.7056 12.7537L64.1017 13.0822C63.8849 12.0402 63.5545 11.0396 63.1236 10.0934L64.6161 9.42432C65.096 10.4783 65.4641 11.593 65.7056 12.7537ZM63.9199 8.07128L62.4984 8.87822C61.9706 7.96287 61.344 7.11021 60.633 6.33467L61.8444 5.24113C62.6352 6.10369 63.3324 7.05235 63.9199 8.07128ZM60.7616 4.16682L59.6595 5.36881C58.8779 4.66324 58.0186 4.04155 57.0961 3.51788L57.9093 2.10739C58.9362 2.69032 59.8923 3.38208 60.7616 4.16682ZM56.5457 1.41663L55.8714 2.8975C54.9178 2.47 53.9093 2.14209 52.8592 1.927L53.1902 0.335555C54.36 0.575144 55.4835 0.940457 56.5457 1.41663ZM51.678 0.0996897L51.5008 1.71515C50.98 1.65892 50.4505 1.63 49.9135 1.63C49.3766 1.63 48.847 1.65892 48.3263 1.71515L48.1491 0.0996898C48.7286 0.0371158 49.3173 0.00500488 49.9135 0.00500488C50.5098 0.00500488 51.0985 0.0371158 51.678 0.0996897ZM46.6368 0.335555L46.9679 1.927C45.9178 2.14209 44.9093 2.47 43.9557 2.8975L43.2814 1.41663C44.3435 0.940458 45.467 0.575144 46.6368 0.335555ZM41.9177 2.10739L42.731 3.51788C41.8085 4.04155 40.9491 4.66324 40.1675 5.36881L39.0654 4.16682C39.9347 3.38208 40.8908 2.69032 41.9177 2.10739ZM37.9827 5.24113L39.1941 6.33468C38.483 7.11021 37.8565 7.96287 37.3287 8.87822L35.9072 8.07128C36.4947 7.05235 37.1918 6.10369 37.9827 5.24113ZM35.211 9.42432L36.7035 10.0934C36.2726 11.0396 35.9421 12.0402 35.7254 13.0822L34.1215 12.7537C34.3629 11.593 34.7311 10.4783 35.211 9.42432ZM33.8838 14.2543C33.8207 14.8292 33.7883 15.4134 33.7883 16.005C33.7883 16.5966 33.8207 17.1808 33.8838 17.7557L35.5119 17.5799C35.4552 17.0632 35.426 16.5378 35.426 16.005C35.426 15.4722 35.4552 14.9468 35.5119 14.4301L33.8838 14.2543ZM34.1215 19.2563L35.7254 18.9278C35.9421 19.9698 36.2726 20.9704 36.7035 21.9166L35.211 22.5857C34.7311 21.5317 34.3629 20.417 34.1215 19.2563ZM35.9072 23.9387L37.3287 23.1318C37.8565 24.0471 38.483 24.8998 39.1941 25.6753L37.9827 26.7689C37.1918 25.9063 36.4947 24.9576 35.9072 23.9387ZM39.0654 27.8432C39.9347 28.6279 40.8908 29.3197 41.9177 29.9026L42.731 28.4921C41.8085 27.9685 40.9491 27.3468 40.1675 26.6412L39.0654 27.8432ZM43.2814 30.5934L43.9557 29.1125C44.9093 29.54 45.9178 29.8679 46.9679 30.083L46.6368 31.6744C45.467 31.4349 44.3436 31.0695 43.2814 30.5934ZM48.1491 31.9103L48.3263 30.2949C48.847 30.3511 49.3766 30.38 49.9135 30.38C50.4505 30.38 50.98 30.3511 51.5008 30.2949L51.678 31.9103C51.0985 31.9729 50.5098 32.005 49.9135 32.005C49.3173 32.005 48.7286 31.9729 48.1491 31.9103ZM53.1902 31.6744L52.8592 30.083C53.9093 29.8679 54.9178 29.54 55.8714 29.1125L56.5457 30.5934C55.4835 31.0695 54.36 31.4349 53.1902 31.6744ZM57.9093 29.9026L57.0961 28.4921C58.0186 27.9685 58.8779 27.3468 59.6595 26.6412L60.7616 27.8432C59.8923 28.6279 58.9362 29.3197 57.9093 29.9026ZM61.8444 26.7689L60.633 25.6753C61.3441 24.8998 61.9706 24.0471 62.4984 23.1318L63.9199 23.9387C63.3324 24.9576 62.6352 25.9063 61.8444 26.7689ZM64.6161 22.5857L63.1236 21.9166C63.5545 20.9704 63.8849 19.9698 64.1017 18.9278L65.7056 19.2563C65.4641 20.417 65.096 21.5317 64.6161 22.5857Z',
};

const LogoSvg = () => {
  const [brand] = useContext(BrandContext);

  return (
    <Link href="/[[...story]]" as="/">
      <a>
        <svg
          width="64"
          height="32"
          viewBox="0 0 67 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.65894 8.0149H15.2793V27.1909H16.9377V8.0149H22.5581V6.36688H9.65894V8.0149Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.1438 30.375C24.145 30.375 30.6313 23.9391 30.6313 16C30.6313 8.0609 24.145 1.625 16.1438 1.625C8.14254 1.625 1.65627 8.0609 1.65627 16C1.65627 23.9391 8.14254 30.375 16.1438 30.375ZM16.1438 32C25.0495 32 32.269 24.8365 32.269 16C32.269 7.16344 25.0495 0 16.1438 0C7.23806 0 0.0185547 7.16344 0.0185547 16C0.0185547 24.8365 7.23806 32 16.1438 32Z"
            fill="black"
          />
          <path d="M59.571 20.8075H57.9585V22.4075H59.571V20.8075Z" fill="black" />
          <path
            d="M43.3325 12.85C43.7029 12.2975 44.2698 12.02 45.0357 12.02C45.6278 12.02 46.0889 12.235 46.424 12.6625C46.7591 13.09 46.9456 13.7325 46.9834 14.59H48.611C48.5707 13.29 48.2356 12.2675 47.6032 11.5175C46.9707 10.7675 46.1141 10.3925 45.0382 10.3925C43.7331 10.3925 42.7404 10.8475 42.0576 11.7575C41.3748 12.6675 41.0347 13.9975 41.0347 15.7475V17.0225C41.0347 18.8075 41.3773 20.15 42.0626 21.055C42.748 21.9575 43.7432 22.41 45.0483 22.41C46.0284 22.41 46.8574 22.045 47.5377 21.3125C48.2154 20.58 48.5757 19.6575 48.6135 18.545H46.9859C46.9531 19.2675 46.7642 19.82 46.4215 20.21C46.0763 20.6 45.6203 20.7925 45.0483 20.7925C44.2572 20.7925 43.6777 20.51 43.3098 19.9475C42.942 19.385 42.7606 18.42 42.7606 17.0575V15.58C42.7706 14.3125 42.9621 13.405 43.3325 12.85Z"
            fill="black"
          />
          <path
            d="M56.8475 20.94C57.5883 19.9625 57.9587 18.635 57.9587 16.9575V15.7375C57.9385 14.0875 57.5581 12.785 56.8148 11.83C56.0715 10.8725 55.0889 10.395 53.8694 10.395C52.6474 10.395 51.6673 10.885 50.924 11.8675C50.1808 12.85 49.8079 14.1825 49.8079 15.8675V17.13C49.8331 18.75 50.216 20.035 50.9518 20.985C51.6875 21.935 52.6676 22.41 53.887 22.41C55.1191 22.4075 56.1068 21.92 56.8475 20.94ZM56.2327 17.1725C56.1874 19.585 55.4038 20.7925 53.8845 20.7925C53.1639 20.7925 52.592 20.4525 52.1662 19.77C51.7404 19.0875 51.5287 18.1525 51.5287 16.96V15.8575C51.5287 14.68 51.7404 13.745 52.1662 13.0575C52.592 12.3675 53.1589 12.025 53.8644 12.025C54.585 12.025 55.1594 12.37 55.5877 13.0575C56.0161 13.7475 56.2302 14.6825 56.2302 15.8675V17.1725H56.2327Z"
            fill="black"
          />

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={shapes[String(brand)] === 'originals' ? 'original' : shapes[String(brand)]}
            fill="black"
          />
        </svg>
      </a>
    </Link>
  );
};

export default LogoSvg;