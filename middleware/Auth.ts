export default function ({ store, redirect }: any) {
  // TODO: the better way to verify the token is validate it with some SDK or backend.
  if (!store.state.user.token) {
    return redirect('/')
  }
}
