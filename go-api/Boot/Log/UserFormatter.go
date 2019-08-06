package Log

import (
	"bytes"
	"fmt"
	"github.com/sirupsen/logrus"
	"strings"
)

const (
	timeFormat = "2006-01-02 15:04:05"
)

func init() {
}

type textFormat struct {
}

func NewTextFormat() *textFormat {
	return &textFormat{}
}

func (f *textFormat) Format(entry *logrus.Entry) ([]byte, error) {
	levelText := strings.ToUpper(entry.Level.String())
	buf := bytes.NewBuffer(make([]byte, 0, 32))
	buf.WriteString(fmt.Sprintf("[%s]", levelText))
	buf.WriteString(fmt.Sprintf("[%s]", entry.Time.Format(timeFormat)))
	for k, v := range entry.Data {
		buf.WriteString(fmt.Sprintf("[%s=%v] ", k, v))
	}
	buf.WriteString(entry.Message)
	buf.WriteString("\n")
	return buf.Bytes(), nil
}