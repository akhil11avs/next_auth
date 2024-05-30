import SvgColor from "@/components/SvgColor";

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Appointment',
    path: '/appointment',
    icon: icon('ic_user'),
  },
  {
    title: 'Doctor',
    path: '/doctor',
    icon: icon('ic_user'),
  },
];

export default navConfig;

