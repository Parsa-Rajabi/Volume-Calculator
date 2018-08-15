// Action script...

a000.onEnterFrame = function () {
    for (y = 0; y < 5; y++) {
        for (x = 0; x < 5; x++) {
            for (z = 0; z < 5; z++) {
                if (y.toString() <= _root.h.value - 1 && x.toString() <= _root.w.value - 1 && z.toString() <= _root.l.value - 1) {
                    _root["a" + x.toString() + y.toString() + z.toString()]._visible = true;
                    continue;
                }
                _root["a" + x.toString() + y.toString() + z.toString()]._visible = false;
            }
        }
    }
    _root.www.text = _root.w.value;
    _root.hhh.text = _root.h.value;
    _root.lll.text = _root.l.value;
    _root.vvv.text = _root.w.value * _root.h.value * _root.l.value;
};
