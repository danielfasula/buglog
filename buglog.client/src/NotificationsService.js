import Swal from 'sweetalert2'

export default class NotificationService {
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.value) {
  //     Swal.fire(
  //       'Deleted!',
  //       'Your file has been deleted.',
  //       'success'
  //     )
  //   }
  // })

  static async confirmAction(buttonText = 'Yes, Delete it!', text = 'This will be Irreversible!') {
    try {
      const res = await Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--success)',
        cancelButtonColor: 'var(--danger)',
        confirmButtonText: buttonText
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
    }
  }

  static toast(title = 'default handler', icon = 'success') {
    Swal.fire({
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-right'
    })
  }
}
