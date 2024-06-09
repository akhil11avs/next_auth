import SvgColor from "@/components/SvgColor";

const icon = (name) => (
  <SvgColor src={`assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('home'),
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: icon('doctor'),
  },
  {
    title: 'Appointment',
    path: '/appointments',
    icon: icon('contact'),
  },
  {
    title: 'City',
    path: '/city',
    icon: icon('ic_location'),
  },
  {
    title: 'Services',
    path: '/services',
    icon: icon('services'),
  },
];

export default navConfig;
