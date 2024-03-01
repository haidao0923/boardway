import Link from 'next/link';
import Image from 'next/image';

export default function BoardWay() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Image
        src="/images/background.png" // Route of the image file
        height={100%} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </>
  );
}