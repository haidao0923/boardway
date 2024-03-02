import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function BoardWay() {
  return (
    <>
      <Head>
        <title>Boardway</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/images/background.png" // Route of the image file
        fill
        alt="Your Name"
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}