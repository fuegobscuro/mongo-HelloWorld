import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(
  Swal.mixin({
    customClass: {
      container: 'max-w-xl mx-auto',
      popup: 'bg-green-50 dark:bg-gray-700 shadow-md drop-shadow-md rounded-lg',
      title: 'text-black dark:text-white text-lg font-bold',
      content: 'text-gray-600 dark:text-gray-200 text-sm shadow-2xl',
      confirmButton:
        'bg-emerald-400 hover:bg-emerald-300 text-black font-bold py-2 px-4 mr-1 drop-shadow-sm shadow-sm rounded-md dark:text-white dark:bg-emerald-800 dark:hover:bg-emerald-700',
      cancelButton:
        'bg-red-400 hover:bg-red-300 text-black font-bold py-2 px-4 mr-1 drop-shadow-sm shadow-sm rounded-md dark:text-white dark:bg-red-800 dark:hover:bg-red-700',
    },
    buttonsStyling: false,
    backdrop: false,
  })
);

export default MySwal;

// For message after succesful confirmation in dark mode:
// html: '<span class="text-gray-400">Your message has been sent.</span>',
