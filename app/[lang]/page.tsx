import MechOrbit from '@/components/MechOrbit/MechOrbit';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <MechOrbit lang={lang} />;
}