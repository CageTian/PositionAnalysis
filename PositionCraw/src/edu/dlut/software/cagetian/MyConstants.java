package edu.dlut.software.cagetian;

public class MyConstants {
	//selenium Driver的存放路径
	public static final String DRIVER_PATH="D:\\ProgramData\\chromedriver.exe";
	//处理job_info的线程数
	public static final int N_INFO_THREAD=20;
	//处理detail的线程数
	public static final int N_DETAIL_THREAD=20;
	//爬取的网站
	public static final String LIEPIN_URL="https://www.liepin.com/zhaopin/";
	//HDFS的ip
	public static final String HDFS_IP="10.17.1.100";
	//HDFS 根目录
	public static final String HDFS_PATH="hdfs://"+HDFS_IP+":9000/";
	//MySQL常量
	public static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	public static final String MYSQL_PATH="jdbc:mysql://localhost:3306/";
	public static final String CONNECT_DB="job";
	public static final String MYSQL_PARAM="?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT&useSSL=false";
	public static final String MYSQL_USER="root";
	public static final String MYSQL_PWD="1234";
	public static final String SAVE_DETAIL_PATH="D:\\temp\\";
}
