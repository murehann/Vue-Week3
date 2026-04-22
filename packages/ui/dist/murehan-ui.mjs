import { createElementBlock as e, createTextVNode as t, normalizeClass as n, openBlock as r, renderSlot as i } from "vue";
var a = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})({
	__name: "BaseButton",
	props: { variant: {
		type: String,
		default: "default"
	} },
	setup(a) {
		let o = {
			default: "btn-default",
			danger: "btn-danger"
		};
		return (s, c) => (r(), e("button", {
			class: n([o[a.variant] ?? o.default, "base-btn"]),
			"data-testid": "base-button"
		}, [i(s.$slots, "default", {}, () => [c[0] ||= t("Button", -1)], !0)], 2));
	}
}, [["__scopeId", "data-v-f7ec63cc"]]);
//#endregion
export { a as BaseButton };
