import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(
  Swal.mixin({
    customClass: {
      container: 'max-w-xl mx-auto',
      popup: 'bg-white dark:bg-gray-800 rounded-lg drop-shadow-2xl shadow-2xl',
      title: 'text-gray-800 dark:text-white text-lg font-bold',
      content: 'text-gray-600 dark:text-gray-200 text-sm shadow-2xl',
      confirmButton:
        'bg-gray-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 mr-1 drop-shadow-md rounded dark:invert',
      cancelButton:
        'bg-gray-300 hover:bg-red-300 text-black font-bold py-2 px-4 ml-1 drop-shadow-md rounded dark:invert dark:hover:bg-green-300',
    },
    buttonsStyling: false,
    backdrop: false,
  })
);

export default MySwal;

// For message after succesful confirmation in dark mode:
// html: '<span class="text-gray-300">Your message has been sent.</span>',
