export function load({ cookies }) {
  const visited = cookies.get('visited');


  // path を明示的に設定することを強く推奨
  cookies.set('visited', 'true', { path: '/' });

  return {
    visited
  };
}
