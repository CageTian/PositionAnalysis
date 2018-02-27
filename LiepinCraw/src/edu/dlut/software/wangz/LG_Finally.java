package edu.dlut.software.wangz;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LG_Finally {
	private static Connection conn;
//	private static int count = 0;
	
	
	private static String type = "Android"; //java py android ml bd dd dl？
//
//	private static String url_duilie = "dd_url_duilie"; // java py android ml bd dd
//			
	private static WebDriver driver;
	static {
		try {
			Class.forName("org.gjt.mm.mysql.Driver");
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/lg_job_data?useUnicode=true&characterEncoding=UTF-8", "root",
					"123abc");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws Exception {
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\knight\\Desktop\\爬虫\\geckodriver.exe");
		// 建立驱动的核心操作对象
		driver = new FirefoxDriver();
		JavascriptExecutor jsDriver = (JavascriptExecutor) driver;
		WebDriverWait wait = new WebDriverWait(driver, 30);
		String url = "https://www.lagou.com/zhaopin/Java/?labelWords=label";
		driver.get(url);
		int count = 0;
		//查找输入和提交
		WebElement keywordEl = driver.findElement(By.id("keyword"));
		WebElement submitEl = driver.findElement(By.id("submit"));
		WebElement nextEl = null;
		WebElement nextEl_dis = null;
		keywordEl.clear();
		keywordEl.sendKeys("搜狗android");
		submitEl.click();
//		// 读取里面所有的超链接地址
			
//		while (true) {
//			Thread.sleep(2000);
//			wait.until(ExpectedConditions.presenceOfElementLocated(By.className("position_link")));
//			
//			
//			
//			// 查找所有连接地址
//			List<WebElement> allLink = driver.findElements(By.tagName("a"));
//			for (WebElement link : allLink) {
//				String href = link.getAttribute("href");
//				try {
//					if (href != null && (href.startsWith("http:") || href.startsWith("https:"))) {
//						if (href.matches(".*/jobs/\\d+\\.html")) {
//							// 去数据库判断是否有重复的地址
//							insertData(href);
//						}
//					}
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//			}

			while(true){
				Thread.sleep(1000);
				wait.until(ExpectedConditions.presenceOfElementLocated(By.className("pager_next")));
				try{
					insertData();
				}catch(Exception e){
					e.printStackTrace();
					System.out.println("该信息已经存在");
				}
				// 点下一页 
				
				nextEl = driver.findElement(By.className("pager_next"));
				if (nextEl == null) {
					conn.close();
					System.exit(0);
				}
				jsDriver.executeScript("window.scrollTo(0,document.body.scrollHeights*0.9);");
				nextEl.click();
				count++;
			}

	}

	private static void insertData() throws Exception {
//		conn.setAutoCommit(false);
//		String sql = "SELECT id FROM LG_data WHERE url = ?";
//		PreparedStatement pst = conn.prepareStatement(sql);
//		pst.setString(1, url);
//		ResultSet rs = pst.executeQuery();
//		if (!rs.next()) {
//			// 不重复的时候，可以加入数据
//			sql = "INSERT INTO " + url_duilie +"(id,type,url) VALUES (?,'"+ type +"',?)";
//			pst = conn.prepareStatement(sql);
//			pst.setLong(1, Long.parseLong(url.substring(url.lastIndexOf("/")+1,url.lastIndexOf("."))));
//			pst.setString(2, url);
//			pst.executeUpdate();	
//		}
//		conn.commit();

//		rs.close();
//		pst.close();
		String sal_low;//最低工资
		String sal_high;//最高工资
		String area;//所在省
		int exp;//最低经验
		String edu;//学历
		String detail;//标签
		//对数据进行处理
		
		//公司的基本信息
		List<WebElement> base_infos = driver.findElements(By.className("li_b_l"));
		//公司的地址
		List<WebElement> city_infos = driver.findElements(By.className("add"));
		//公司id
		List<WebElement> allLink = driver.findElements(By.tagName("a"));
		//
		List<String> allurl = new ArrayList<String>();
		for (WebElement link : allLink) {
			String href = link.getAttribute("href");
			try {
				if (href != null && (href.startsWith("http:") || href.startsWith("https:"))) {
					if (href.matches(".*/jobs/\\d+\\.html")) {
						// 加入到地址中
						allurl.add(href);
						
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		
		String base_info = null;
		String city_info = null;
		String url = null;
		int id;
		conn.setAutoCommit(false);
		for(int i=0;i<base_infos.size()/2;i++){
			try{
				url = allurl.get(i);
				id = Integer.parseInt(url.substring(url.lastIndexOf("/")+1,url.lastIndexOf(".")));
				base_info = (base_infos.get(2*i).getText()).toLowerCase();
				detail = base_infos.get(2*i + 1).getText().replaceAll("\\s+", "/");
				city_info = city_infos.get(i).getText();
				if(city_info.contains("·")){
					city_info = city_info.substring(1, city_info.indexOf("·"));
				}else{
					city_info = city_info.substring(1,city_info.indexOf("]"));
				}
				
				sal_low = base_info.substring(0, base_info.indexOf("k")+1);
				sal_high = base_info.substring(base_info.indexOf("k")+2, base_info.lastIndexOf("k")+1);
				area = city_info;
				if(!(base_info.contains("经验不限")||base_info.contains("应届")||base_info.contains("以上"))){
					exp = Integer.parseInt(base_info.substring(base_info.indexOf("经验")+2, base_info.lastIndexOf("-")));
				}else if(base_info.contains("经验不限")){
					exp = -1;
				}else if(base_info.contains("应届")){
					exp = 0;
				}else{
					exp = Integer.parseInt(base_info.substring(base_info.indexOf("经验")+2, base_info.lastIndexOf("年")));
				}
				edu = base_info.substring(base_info.indexOf("/")+1, base_info.indexOf("/")+4);
				String sql = "INSERT INTO lg_info(id,type,sal_low,sal_high,area,exp,edu,detail) VALUES (?,'"+ type +"',?,?,?,?,?,?)";
				PreparedStatement pst = conn.prepareStatement(sql);
				pst = conn.prepareStatement(sql);
				pst.setInt(1, id);
				pst.setString(2, sal_low);
				pst.setString(3, sal_high);
				pst.setString(4, area);
				pst.setInt(5, exp);
				pst.setString(6, edu);
				pst.setString(7, detail);
				pst.executeUpdate();
				conn.commit();
				System.out.println("第"+(i+1)+"个职位信息");
				System.out.println(base_info);
				System.out.println(sal_low);
				System.out.println(sal_high);
				System.out.println(area);
				System.out.println(exp);
				System.out.println(detail);
				System.out.println("-------------------------------");
			}catch(Exception e){
				e.printStackTrace();
			}
			
		}
	
		
		
		
		
		
	}
}
