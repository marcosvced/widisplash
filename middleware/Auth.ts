export default function ({ store, redirect }: any) {
  if (!store.state.user.token) {
    return redirect('/')
  }
}
