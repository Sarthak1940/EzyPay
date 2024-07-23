"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "./src/button"
export const LandingPage = () => {
  return <div className="w-screen font-serif">
    <div>
      <HeroSection/>
    </div>
    <div>
      <PayFriends/>
    </div>
    <div>
      <ShopBrands/>
    </div>
    <div>
      <ManageMoney/>
    </div>
    <div>
      <GrowBusiness/>
    </div>
    <div>
      <TermsAndConditions/>
    </div>
    <div>
      <Footer/>
    </div>
  </div>
}



function HeroSection() {
  const router = useRouter()
  return <div className="flex flex-col md:flex-row justify-center gap-12 py-20 px-12">
    <div className="flex flex-col items-center md:items-start">
      <p className="text-[4em] md:text-[2.86em] md:text-left text-center leading-[100%] -tracking-[0.1rem] mb-5 font-serif">Fast, safe,
        <br/> social
        <br/> payments</p>
      <p className="text-[1.25rem] md:text-left text-center font-sans mb-5">Pay, get paid, grow a business, and more. 
        <br/>Join the tens of millions of people on EzyPay.</p>

      <Button onClick={() =>{router.push("/api/auth/signin")}} disabled={false} colour="text-white bg-[#7132f5] hover:bg-[#6a51a6]">Sign up</Button>
    </div>
    <div className="relative w-full md:w-[640px] h-auto">
      <Image src="/home-hero.webp" alt="hero" priority layout="responsive" width={500} height={500}/>
    </div> 
  </div>
}

function PayFriends() {
  const router = useRouter()
  return <div className="bg-white py-20 px-12 flex flex-col items-center">
    <div className="md:w-[70%] w-full">
      <p className="text-[2.86em] md:text-[4em] leading-[100%] -tracking-[0.1rem] mb-5 md:pb-10 font-sans">Pay Friends</p>

      <div className="block md:hidden w-full h-auto mb-5">
        <Image width={2000} height={1587} className="object-cover opacity-100" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/5UXR3L08nzS4cw3xZrFaKr/c4e0fba5b3fb3804cf75da52a206e49f/home-pay-friends-right-mobile.png?w=630&amp;h=500&amp;q=50&amp;fm=png&amp;bg=transparent"  alt=""/>
      </div>

      <p className="text-[1.1rem] md:text-[1.2rem] font-sans mb-5 w-full md:w-[60%] leading-[140%] -tracking-[0.05rem]">EzyPay helps settling up feel more like catching up. Send and receive money with EzyPay friends to split everyday necessities, bills, and shared activities like takeout or travel.
        <br/><br/>
        Need a gift? Keep it simple and make any payment feel extra special with EzyPay.
      </p>

      <Button onClick={() =>{router.push("/api/auth/signin")}} disabled={false} colour="text-white bg-[#7132f5] hover:bg-[#6a51a6]">Sign up</Button>
    </div>
    <div className="w-full block md:hidden">
      <Image width={2000} height={1580.9999999999998} className="object-cover opacity-100" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/1C9HBTjYhzYUNJM4zbzmAx/1d4420fa7c89927c2e85293da0bbfaed/home-pay-friends-left-mobile.png?w=630&amp;h=498&amp;q=50&amp;fm=png&amp;bg=transparent" alt=""/>
    </div>

    <div className="flex relative w-full lg:w-[70%] gap-[4rem]">
      <div className="mt-24 w-full md:w-[40%]">
        <Image src="/home-pay-friends-left.webp" alt="" width={500} height={500} className="hidden md:block"/>
      </div>
      <div className="relative w-[45%]">
        <Image src="/home-pay-friends-right.webp" alt="" width={400} height={400} className="absolute hidden md:block top-[2rem]"/>
      </div>
    </div>
  </div>
}

function ShopBrands() {
  const router = useRouter()
  return <div className="flex flex-col md:flex-row justify-center gap-x-[8rem] gap-y-4 py-20 px-12 items-center">
  <div>
    <p className="text-[2rem] leading-[100%] mb-5 font-sans -tracking-[0.1rem] block md:hidden">Shop your favorite brands</p>
    <Image src="/home-check-out-at-your-favorite-brands.webp" alt="hero" width={500} height={500}/>
  </div>
  <div className="w-full md:w-[30%]">
    <p className="text-[3.5rem] leading-[100%] mb-5 -tracking-[0.1rem] font-sans hidden md:block">Shop your favorite <br/> brands</p>
    <p className="text-[1.2rem] font-sans mb-5 leading-[140%] -tracking-[0.05rem]">Just like sending money to friends, you can use EzyPay to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner     can cover this morning’s latte.</p>
    <p className="text-[1.2rem] font-sans mb-5 leading-[140%] -tracking-[0.05rem]">Digital gift cards are also available to send for last-minute gifts, special occasions, or just saying thanks. 
    </p>

    <Button onClick={() =>{router.push("/api/auth/signin")}} disabled={false} colour="text-white bg-[#7132f5] hover:bg-[#6a51a6]">Sign up</Button>
  </div> 
</div>
}

function ManageMoney() {
  return <div className="bg-white py-20 px-6 flex flex-col items-start md:items-center">
  <div>
    <p className="text-[2rem] md:text-[4.5rem] text-center leading-[100%] -tracking-[0.1rem] mb-8 md:mb-20 font-sans">Manage your money on EzyPay</p>
  </div>

  <div className="w-full md:w-[70%]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="w-[100%] px-2">
        <Image src="/home-manage-your-money-credit-card.webp" alt="" width={320} height={320} className="hidden md:block"/>
        <Image width="2000" height="1587" className="object-cover opacity-100 block md:hidden" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/yPq2V7ztErPfk4XEcpgfL/9bcfde0bb9620858d64f08d71e591cc3/home-manage-your-money-credit-card-mobile.png?w=630&amp;h=500&amp;q=50&amp;fm=png&amp;bg=transparent" alt=""/>


        <p className="text-[2rem] font-sans mt-8 -tracking-[0.1rem]">EzyPay Credit Card</p>
        <p className="mt-2 font-sans leading-[140%] -tracking-[0.05rem] text-[1.1rem] text-[#2f3033]">Earn up to 3% cash back on eligible purchases with the EzyPay Credit Card. There’s no annual fee, no limit to the cash back you can earn, and no impact to your credit score if declined.</p>
      </div>

      <div className="w-[100%] px-2">
        <Image src="/home-manage-your-money-debit-card.webp" alt="" width={320} height={320} className="hidden md:block"/>
        <Image width="2000" height="1587" className="object-cover opacity-100 block md:hidden" sizes="(min-width: 630px) 630px, 100vw" src="/home-manage-your-money-debit-card-mobile.webp" alt=""/>

        <p className="text-[2rem] font-sans mt-8 -tracking-[0.1rem]">EzyPay Debit Card</p>
        <p className="mt-2 font-sans text-[1.1rem] text-[#2f3033]">Spend your balance in more places using the EzyPay Debit Card – all with no monthly fees or minimum balance requirements. You can even earn up to 5% cash back by activating offers in the app.</p>
      </div>

      <div className="w-[100%] px-2">
        <Image src="/home-manage-your-money-venmo-for-ages.webp" alt="" width={320} height={320} className="hidden md:block"/>
        <Image width="2000" height="1587" className="object-cover opacity-100 block md:hidden" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/7eHlpdGTbXkA7S9iJGucya/2cd1ec65e348e32f73101145fa11b0fb/home-manage-your-money-venmo-for-ages-mobile.png?w=630&amp;h=500&amp;q=50&amp;fm=png&amp;bg=transparent" alt=""></Image>

        <p className="text-[2rem] font-sans mt-8 -tracking-[0.1rem]">EzyPay for ages 13-17</p>
        <p className="mt-2 font-sans text-[1.1rem] text-[#2f3033]">A debit card for teens, and EzyPay access to track their spending and send money to trusted friends and family. Plus, full parental visibility and controls. All with no minimum balance, no monthly fee.</p>
      </div>
    </div>
  </div>
</div>
}

function GrowBusiness() {
  const router = useRouter()
  return <div className="py-10 md:py-20 px-12 flex flex-col items-center">
  <div className="md:w-[70%] w-full">
    <p className="text-[2.86em] md:text-[4em] leading-[100%] -tracking-[0.1rem] mb-5 md:pb-10 font-sans">Grow Business</p>

    <div className="block md:hidden w-full h-auto mb-5">
      <Image width="2000" height="1587" className="object-cover opacity-100" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/7yqerXedwYIQIIi1ak2QCd/23c872b47ffe7063f62896a9d1053991/home-grow-a-business-left-mobile.png?w=630&amp;h=500&amp;q=50&amp;fm=png&amp;bg=transparent" alt=""/>
    </div>

    <p className="text-[1.1rem] md:text-[1.2rem] font-sans mb-5 w-full md:w-[60%] leading-[140%] -tracking-[0.05rem]">Take business payments and engage customers with the help of a seamless checkout experience people already know and trust.</p>


    <Button onClick={() =>{router.push("/api/auth/signin")}} disabled={false} colour="text-white bg-[#7132f5] hover:bg-[#6a51a6]">Sign up</Button>
  </div>

  <div className="w-full block md:hidden mt-6">
  <Image width="2000" height="1587" className="object-cover opacity-100" sizes="(min-width: 630px) 630px, 100vw" src="https://images.ctfassets.net/gkyt4bl1j2fs/36Xwzmp0CIrb0TAhHOALnU/cdd91cd8327aa573f1a493a0cfccb465/home-grow-a-business-right-mobile.png?w=630&amp;h=500&amp;q=50&amp;fm=png&amp;bg=transparent" alt=""/>
  </div>

  <div className="flex relative w-full lg:w-[70%] gap-[4rem]">
    <div className="mt-24 w-full md:w-[40%]">
    <Image src="/home-grow-a-business-left.webp" alt="" width={400} height={400} className="hidden md:block"/>
    </div>
    <div className="relative w-[45%]">
      <Image src="/home-grow-a-business-right.webp" alt="" width={400} height={400} className="absolute hidden md:block top-[2rem]"/>
    </div>
  </div>
</div>
}

function TermsAndConditions() {
  return <div className="bg-white py-20 px-12 flex justify-center">
  <div className="w-[74%]">
    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">EzyPay account required. Eligibility requirements and terms apply.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">See EzyPay Credit Card Rewards Program Terms. Use of cash back is subject to the terms of the EzyPay User Agreement. </p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">See Terms & Rates for New Accounts.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">Application subject to credit approval. You must be at least 18 years old and reside in the US or its territories to apply. You must have a EzyPay account in good standing, that has been open for at least 30 days prior to application. An approved EzyPay Credit Card application will result in a hard credit inquiry, which may impact your credit bureau score.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">Each EzyPay Offer Powered by DOSH is available for a limited time only at participating merchants on qualifying purchases (as stated in the particular offer and subject to the full program terms). By participating, you agree that DOSH may create a wallet for you on its system in order for you to earn and redeem EzyPay Offers. Any EzyPay Offer that you earn will be transferred to your EzyPay account. All offers made available to you may become unavailable without notice. Additional terms and exclusions apply. See full EzyPay Offers Powered by Dosh Terms of Service and Privacy Policy here.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">The EzyPay Teen Account is available for eligible users 13-17 years old with parent or legal guardian sign up. Terms apply</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">PayPal Balance or EzyPay accounts required.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">When you buy or sell cryptocurrency on PayPal or EzyPay (including when you checkout with crypto on PayPal), Paypal or EzyPay will disclose an exchange rate and any fees you will be charged for that transaction. For currencies other than PYUSD, the exchange rate includes a spread that is earned on each purchase and sale.  Learn more about cryptocurrency fees on PayPal and EzyPay.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">Buying and selling cryptocurrency is subject to a number of risks and may result in significant losses. Please see PayPal’s disclosure and EzyPay’s disclosure for more details.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">PayPal and EzyPay do not make any recommendations regarding buying and or selling cryptocurrency. Consider seeking advice from your financial and tax advisor. Some custody, trading, and transfer services for cryptocurrency are performed for PayPal and EzyPay by our licensed service provider, Paxos Trust Company, LLC.  PayPal USD is issued by Paxos, not PayPal or EzyPay, and is subject to the Paxos US Dollar-Backed Stablecoin Terms and Conditions.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">Any cryptocurrencies you hold in your PayPal Balance or EzyPay account are not eligible for FDIC insurance.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">Cryptocurrency activity is not a regulated activity in many U.S. states and territories. PayPal, Inc. is licensed to engage in virtual currency business activity by the New York State Department of Financial Services. Buying, selling, transferring, and holding cryptocurrency with PayPal and EzyPay is not available in Hawaii and where prohibited by law.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">All cryptocurrency prices shown are for illustrative purposes only.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">The EzyPay Visa Credit Card is issued by Synchrony Bank pursuant to a license from Visa USA Inc. VISA is a registered trademark of Visa International Service Association and used under license.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">EzyPay Mastercard® is issued by The Bancorp Bank, N.A. pursuant to license by Mastercard International Incorporated. Card may be used everywhere Mastercard is accepted in the U.S. Mastercard and the circles design are registered trademarks of Mastercard International Incorporated. The Bancorp Bank, N.A. is issuer of the Card only and not responsible for the associated accounts or other products, services, or offers from EzyPay.</p>

    <p className="text-[0.9rem] text-[#55585e] font-sans mb-5">All trademarks and brand names belong to their respective owners. Use of these trademarks and brand names do not represent endorsement by or association with this card program. All rights reserved. Standard data rates from your wireless service provider may apply.</p>

  </div>
</div>
}

function Footer() {
  return <div className="grid grid-cols-2 md:grid-cols-4 font-sans px-12 py-20 gap-y-12 bg-[#7132f5]">
    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Send & Recieve</p>
      <ul className="text-white text-[0.9rem]">
        <li>How it works</li>
        <li>Tips & Tricks</li>
        <li>Manage balance</li>
        <li>Direct Deposit</li>
      </ul>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Pay with EzyPay</p>
      <ul className="text-white text-[0.9rem]">
        <li>Ways to pay</li>
        <li>Pay businesses</li>
        <li>Pay in apps & online</li>
        <li>Pay in stores</li>
        <li>EzyPay Debit Card</li>
        <li>EzyPay Credit Card</li>
      </ul>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">EzyPay for Business</p>
      <ul className="text-white text-[0.9rem]">
        <li>Ways to get paid</li>
        <li>Accept EzyPay payments</li>
        <li>Accept EzyPay in apps & online</li>
      </ul>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Help Center</p>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Resources</p>
      <ul className="text-white text-[0.9rem]">
        <li>Why EzyPay</li>
        <li>Trust & safety</li>
        <li>Our fees</li>
        <li>Developers</li>
      </ul>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Company</p>
      <ul className="text-white text-[0.9rem]">
        <li>About us</li>
        <li>Jobs</li>
        <li>Accessibility</li>
        <li>Media inquiries</li>
        <li>Blog</li>
      </ul>
    </div>

    <div>
      <p className="mb-3 text-[1.2rem] text-[#c0b9ff]">Legal</p>
      <ul className="text-white text-[0.9rem]">
        <li>Terms</li>
        <li>Privacy</li>
        <li>Cookies</li>
      </ul>
    </div>

    <div className="mb-3 text-[1.2rem] text-[#c0b9ff]">
      <p>Contact us</p>
    </div>
  </div>
}