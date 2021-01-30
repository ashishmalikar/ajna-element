/**
 * Install new plugin
 * @param plugin
 */
export function install(plugin) {
    // if plugin is function
    if (typeof plugin === 'function') {
        plugin.call();
    }
}
