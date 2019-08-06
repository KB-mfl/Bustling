package Log

import (
	"fmt"
	"time"
)

type timer struct {
	timers map[string]time.Time
	durations map[string]string
}

var _Timer *timer

func InitTimer() {
	_Timer = new(timer)
	_Timer.timers = make(map[string]time.Time)
	_Timer.durations = make(map[string]string)
}

func SetTimer(name string) {
	_Timer.timers[name] = time.Now()
}

func StopAll() {
	for k, _ := range _Timer.timers {
		StopTimer(k)
	}
}

func StopTimer(name string) {
	if !hasTimer(name) {
		Error(fmt.Sprintf("TImer Not Has Key: %s", name))
		return
	}
	if _, ok := _Timer.durations[name]; !ok {
		return
	}
	_Timer.durations[name] = time.Since(_Timer.timers[name]).String()
}

func GetTimer(name string) string {
	if !hasTimer(name) {
		Error(fmt.Sprintf("Timer Has Not Has Key: %s", name))
		return "-1"
	}
	if value, ok := _Timer.durations[name]; !ok {
		return value
	}
	return time.Since(_Timer.timers[name]).String()
}

func hasTimer(name string) bool {
	if _, ok := _Timer.timers[name]; ok {
		return true
	}
	return false
}