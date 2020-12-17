/**
 * Install new plugin
 * @param plugin 
 */
export function install (plugin: any) {
  
  // if plugin is function
  if(typeof plugin === 'function') {
    plugin.call();
  }  
}