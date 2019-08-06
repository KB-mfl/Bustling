package Log

import (
	"Bustling/go-api/Boot/Config"
	"fmt"
	"github.com/sirupsen/logrus"
	"os"
	"strings"
)

type _log struct {
	_logKey []string
	_logItems map[string]string
	_logString string
	LogEngine map[string]*logrus.Logger
}

var Log *_log

func InitLog() {
	dir := Config.GetString("log.dir")
	exist, err := pathExists(dir)
	if err != nil {
		panic(fmt.Errorf("Fatal error check config dir: %s\n", err))
	}
	if !exist {
		errMkdir := os.Mkdir(dir, os.ModePerm)
		if errMkdir != nil {
			panic(fmt.Errorf("Fatal error check config dir: %s\n", errMkdir))
		}
	}
	Log = new(_log)
	dir = trimSuffix(dir, "/")
	logFileName := [6]string{"debug", "info", "warning", "error", "fatal", "panic"}
	Log.LogEngine = make(map[string]*logrus.Logger)
	for i := 0; i < len(logFileName); i++ {
		initLogEngine(dir, logFileName[i])
	}
	Log._logKey = make([]string, 0, 16)
	Log._logItems = make(map[string]string)
	Log._logString = ""
}

func initLogEngine(dir, logName string) {
	logrus.New()
	log := &logrus.Logger{
		Out: os.Stderr,
		Level: getLogLevel(),
		Formatter: NewTextFormat(),
	}
	file, err := os.OpenFile(dir + "/" + logName + ".log", os.O_CREATE | os.O_WRONLY | os.O_APPEND, 0755)
	if err == nil {
		log.Out = file
	} else {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	Log.LogEngine[logName] = log
}

func Info(logString string) {
	Log.LogEngine["info"].Info(logString)
}

func Warning(logString string) {
	Log.LogEngine["warning"].Warn(logString)
}

func Debug(logString string) {
	Log.LogEngine["debug"].Debug(logString)
}

func Error(logString string) {
	Log.LogEngine["error"].Error(logString)
}

func Fatal(logString string) {
	Log.LogEngine["fatal"].Fatal(logString)
}

func Panic(logString string) {
	Log.LogEngine["panic"].Panic(logString)
}

func PrintNotice() {
	Log.LogEngine["warning"].Warn(Log.getLogString())
}

func PushNotice(key, value string) {
	Log._logItems[key] = value
	Log._logKey = append(Log._logKey, key)
}

func (log *_log) getLogString() string {
	log._logString = ""
	for _, key := range log._logKey {
		log._logString += "[" + key + "=" + log._logItems[key] + "]"
	}
	return log._logString
}

func trimSuffix(s, suffix string) string {
	if strings.HasSuffix(s, suffix) {
		s = s[:len(s) - len(suffix)]
	}
	return s
}

func getLogLevel() logrus.Level {
	logLevelString := Config.GetString("log.level")
	switch logLevelString {
	case "Debug":
		return logrus.DebugLevel
	case "Info":
		return logrus.InfoLevel
	case "Warning":
		return logrus.WarnLevel
	case "Error":
		return logrus.ErrorLevel
	case "Panic":
		return logrus.PanicLevel
	case "Fatal":
		return logrus.FatalLevel
	default:
		return logrus.WarnLevel
	}
}

func pathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}