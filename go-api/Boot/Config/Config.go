package Config

import (
	"fmt"
	"github.com/spf13/viper"
	"strconv"
)

func InitConfig()  {
	viper.SetConfigName("env")
	viper.AddConfigPath("./")
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s\n", err))
	}
	return
}

func SetDefault(name string, value interface{})  {
	viper.SetDefault(name, value)
}

func GetInt(name string) int {
	return viper.GetInt(name)
}

func GetString(name string) string {
	return viper.GetString(name)
}

func GetBool(name string) bool {
	return viper.GetBool(name)
}

func GetStringMapString(name string) map[string]string {
	return viper.GetStringMapString(name)
}

func GetStringSlice(name string) []string {
	return viper.GetStringSlice(name)
}

func GetIntSlice(name string) []int {
	arr := viper.GetStringSlice(name)
	ret := make([]int, len(arr), len(arr))
	var err error
	for i := len(arr) - 1; i >= 0; i-- {
		ret[i], err = strconv.Atoi(arr[i])
		if err != nil {
			ret[i] = 0
		}
	}
	return ret
}

func GetIntWithDefault(name string, defaultValue interface{}) int {
	viper.SetDefault(name, defaultValue)
	return viper.GetInt(name)
}

func GetStringWithDefault(name string, defaultValue string) string {
	viper.SetDefault(name, defaultValue)
	return viper.GetString(name)
}

func GetBoolWithDefault(name string, defaultValue string) bool {
	viper.SetDefault(name, defaultValue)
	return viper.GetBool(name)
}

func GetStringMapStringWithDefault(name string, value interface{}) map[string]string {
	viper.SetDefault(name, value)
	return viper.GetStringMapString(name)
}

func GetStringSliceWidthDefault(name string, value interface{}) []string {
	viper.SetDefault(name, value)
	return viper.GetStringSlice(name)
}

func GetIntSliceWidthDefault(name string, value interface{}) []int {
	viper.SetDefault(name, value)
	arr := viper.GetStringSlice(name)
	ret := make([]int, len(arr), len(arr))
	var err error
	for i := len(arr) - 1; i >= 0; i-- {
		ret[i], err = strconv.Atoi(arr[i])
		if err != nil {
			ret[i] = 0
		}
	}
	return ret
}