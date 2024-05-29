import SvgColor from "@/components/SvgColor";

const icon = (name) => (
  <SvgColor src={`assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/admin',
    icon: icon('home'),
  },
  {
    title: 'Doctors',
    path: '/admin/doctors',
    icon: icon('doctor'),
  },
  {
    title: 'Appointment',
    path: '/appointment',
    icon: icon('contact'),
  },
  // {
  //   title: 'Services',
  //   path: '/services',
  //   icon: icon('services'),
  // },
];

export default navConfig;
