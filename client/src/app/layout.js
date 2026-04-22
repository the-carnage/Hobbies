import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Hobbies - Connect Through Your Passions',
  description: 'A social media platform for hobby enthusiasts. Share your interests, connect with like-minded people, and discover new passions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
