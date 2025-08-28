import { ThemeSettings, useThemeContext } from '@/common/context';

export default function useThemeCustomizer() {
	const { settings, updateSettings, updateLayout, updateTopbar, updateSidebar,updateMenu } =
		useThemeContext();
 
	const layoutType = settings.layout.type;
	const layoutTheme = settings.theme;
	const layoutWidth = settings.layout.mode;
	const topBarTheme = settings.topbar.theme;
	const sideBarTheme = settings.sidebar.theme;
	const sideBarType = settings.sidebar.size;
	const layoutPosition = settings.layout.menuPosition;
	const showSideBarUserInfo = settings.sidebar.user;

	/**
	 * Changes the layout type
	 */
	const handleChangeLayoutType = (type: string) => {
		switch (type) {
			case 'horizontal':
				updateLayout({ type: ThemeSettings.layout.type.horizontal });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateLayout({ type: ThemeSettings.layout.type.vertical });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the layout theme
	 */
	const handleChangeLayoutTheme = (theme: string) => {
		switch (theme) {
			case 'dark':
				updateSettings({ theme: ThemeSettings.theme.dark });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateSettings({ theme: ThemeSettings.theme.light });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the layout width
	 */
	const handleChangeLayoutWidth = (width: string) => {
		switch (width) {
			case 'boxed':
				updateLayout({ mode: ThemeSettings.layout.mode.boxed });
				updateMenu({ size: settings.menu });
				break;
			case 'detached':
				updateLayout({ mode: ThemeSettings.layout.mode.detached });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateLayout({ mode: ThemeSettings.layout.mode.fluid });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the topbar theme
	 */
	const handleChangeTopBarTheme = (value: string) => {
		switch (value) {
			case 'dark':
				updateTopbar({ theme: ThemeSettings.topbar.theme.dark });
				updateMenu({ size: settings.menu });
				break;
			case 'brand':
				updateTopbar({ theme: ThemeSettings.topbar.theme.brand });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateTopbar({ theme: ThemeSettings.topbar.theme.light });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the left sidebar theme
	 */
	const handleChangeSideBarTheme = (theme: string) => {
		switch (theme) {
			case 'light':
				updateSidebar({ theme: ThemeSettings.sidebar.theme.light });
				updateMenu({ size: settings.menu });
				break;
			case 'brand':
				updateSidebar({ theme: ThemeSettings.sidebar.theme.brand });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateSidebar({ theme: ThemeSettings.sidebar.theme.dark });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the left sidebar type
	 */
	const handleChangeSideBarType = (type: string) => {
		switch (type) {
			case 'fullscreen':
				updateSidebar({ size: ThemeSettings.sidebar.size.fullscreen });
				updateMenu({ size: settings.menu });
				break;
			case 'full':
				updateSidebar({ size: ThemeSettings.sidebar.size.full });
				updateMenu({ size: settings.menu });
				break;
			case 'sm-hover':
				updateSidebar({ size: ThemeSettings.sidebar.size.showOnHover });
				updateMenu({ size: settings.menu });
				break;
			case 'condensed':
				updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
				updateMenu({ size: settings.menu });
				break;
			case 'compact':
				updateSidebar({ size: ThemeSettings.sidebar.size.compact });
				updateMenu({ size: settings.menu });
				break;
			default:
				updateSidebar({ size: ThemeSettings.sidebar.size.default });
				updateMenu({ size: settings.menu });
				break;
		}
	};

	/**
	 * Changes the layout position
	 */
	const handleChangeLayoutPosition = (position: string) => {
		switch (position) {
			case 'scrollable':
				updateLayout({
					menuPosition: ThemeSettings.layout.menuPosition.scrollable,
				});
				break;
			default:
				updateLayout({ menuPosition: ThemeSettings.layout.menuPosition.fixed });
				break;
		}
	};

	/**
	 * Toggles the sidebar user info
	 */
	const handleToggleSideBarUserInfo = (visible: boolean) => {
		updateSidebar({
			user: visible ? ThemeSettings.sidebar.user.show : ThemeSettings.sidebar.user.hidden,
		});
		updateMenu({ size: settings.menu });
	};

	/**
	 * Reset Layout
	 */
	const reset = () => {
		updateSettings({
			layout: {
				type: ThemeSettings.layout.type.horizontal,
				mode: ThemeSettings.layout.mode.fluid,
				menuPosition: ThemeSettings.layout.menuPosition.fixed,
			},
			theme: ThemeSettings.theme.light,
			topbar: {
				theme: ThemeSettings.topbar.theme.light,
				logo: ThemeSettings.topbar.logo.show,
			},
			sidebar: {
				theme: ThemeSettings.sidebar.theme.dark,
				size: ThemeSettings.sidebar.size.default,
				user: ThemeSettings.sidebar.user.hidden,
			},
			rightSidebar: ThemeSettings.rightSidebar.show,
			carrito: ThemeSettings.carrito.hidden,
			menu: [],
		});
	};
	/**
	 * carrito Layout
	 */
	const carrito = () => {
		updateSettings({
			layout: {
				type: ThemeSettings.layout.type.horizontal,
				mode: ThemeSettings.layout.mode.fluid,
				menuPosition: ThemeSettings.layout.menuPosition.fixed,
			},
			theme: ThemeSettings.theme.light,
			topbar: {
				theme: ThemeSettings.topbar.theme.light,
				logo: ThemeSettings.topbar.logo.show,
			},
			sidebar: {
				theme: ThemeSettings.sidebar.theme.dark,
				size: ThemeSettings.sidebar.size.default,
				user: ThemeSettings.sidebar.user.hidden,
			},
			rightSidebar: ThemeSettings.rightSidebar.show,
			carrito: ThemeSettings.carrito.show,
		});
	};
	const cerrarCarrito = () => {
		updateSettings({
			layout: {
				type: ThemeSettings.layout.type.horizontal,
				mode: ThemeSettings.layout.mode.fluid,
				menuPosition: ThemeSettings.layout.menuPosition.fixed,
			},
			theme: ThemeSettings.theme.light,
			topbar: {
				theme: ThemeSettings.topbar.theme.light,
				logo: ThemeSettings.topbar.logo.show,
			},
			sidebar: {
				theme: ThemeSettings.sidebar.theme.dark,
				size: ThemeSettings.sidebar.size.default,
				user: ThemeSettings.sidebar.user.hidden,
			},
			rightSidebar: ThemeSettings.rightSidebar.hidden,
			carrito: ThemeSettings.carrito.hidden,
			menu: ThemeSettings.carrito.hidden,
		});
	};
	return {
		layoutType,
		layoutTheme,
		layoutWidth,
		topBarTheme,
		sideBarTheme,
		sideBarType,
		layoutPosition,
		showSideBarUserInfo,
		handleChangeLayoutType,
		handleChangeLayoutTheme,
		handleChangeLayoutWidth,
		handleChangeTopBarTheme,
		handleChangeSideBarTheme,
		handleChangeSideBarType,
		handleChangeLayoutPosition,
		handleToggleSideBarUserInfo,
		reset,
		carrito,
		cerrarCarrito,
	};
}
