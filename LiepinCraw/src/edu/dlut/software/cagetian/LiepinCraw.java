package edu.dlut.software.cagetian;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import edu.dlut.software.cagetian.beans.JobDetail;
import edu.dlut.software.cagetian.beans.JobInfo;


public class LiepinCraw {

	public static String ID_TYPE;
	private static String seed_url;
	public static volatile int page = 0;
	private static List<String> url_li = Collections.synchronizedList(new ArrayList<String>());

	static {
		// 打开种子页面
		seed_url = CrawDao.InitSeed();
		if (seed_url==null){
			System.out.println("no seed to process!");
			System.exit(0);
		}
			
		ID_TYPE = seed_url.substring(seed_url.indexOf("key=")+4,seed_url.indexOf("&", seed_url.indexOf("key=")+4));//seed_url.indexOf("&", seed_url.indexOf("key=")+4)
		// 开启job_info线程
		for (int i = 0; i < MyConstants.N_INFO_THREAD; i++) {
			Thread t = new LiepinCraw().new InfoThread();
			t.setDaemon(true);
			t.start();
			System.out.println("Info thread " + (i + 1) + "is ready...");
		}
		// 开启detail处理线程
		for (int i = 0; i < MyConstants.N_DETAIL_THREAD; i++) {
			Thread t = new LiepinCraw().new DetailThread();
			t.setDaemon(true);
			t.start();
			System.out.println("Detail thread " + (i + 1) + " is ready...");
		}
	}

	class InfoThread extends Thread {

		@Override
		public void run() {
			int flag = 0;
			while (true) {
				synchronized (url_li) {
					if (url_li.size() != 0) {
						String url;
						url = url_li.get(0);
						url_li.remove(0);
						List<JobInfo> jobInfo_li = CrawUtils.parseJobInfo(url);
						CrawDao.insertJobInfo(jobInfo_li);
					} else
						flag = 1;
				}
				if (flag == 1) {
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					flag = 0;
				}
			}
		}

	}

	public class DetailThread extends Thread {

		@Override
		public void run() {
			String url;
			while (true) {
				if (null != (url = CrawDao.selectJobInfoUrl())) {
					JobDetail jobDetail = CrawUtils.parseDetail(url);
					CrawUtils.saveDetail(jobDetail, CrawUtils.SAVE_TO_MYSQL);
				} else {
					try {

						Thread.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					// System.out.println("end");
					// break;

				}

			}
		}
	}

	public static void main(String[] args) throws Exception {
		// 需要将驱动加载到java的执行环境里
		System.setProperty("webdriver.chrome.driver", MyConstants.DRIVER_PATH);
		// 建立驱动的核心操作对象
		WebDriver driver = new ChromeDriver();
		JavascriptExecutor jsDriver = (JavascriptExecutor) driver;
		
		driver.get(seed_url);
		// 初始化变量
		WebElement nextEl;
		Boolean isPageEnd = false;
		
		while (!isPageEnd) {
			nextEl = driver.findElement(By.linkText("下一页"));
			// 判断是否最后一页
			isPageEnd = nextEl.getAttribute("href").equals("javascript:;");
			// 滚动加载
			jsDriver.executeScript("window.scrollTo(0,document.body.scrollHeight-1000);");
			// 添加job_info
			String c_url = driver.getCurrentUrl();
			url_li.add(c_url);
			
			
			System.out.println(++page);
			// 转到下一页
			nextEl.click();
		}

		// 等待子进程处理结束
		while (true) {
			if (url_li.size() == 0) {
				Thread.sleep(10000);
				System.out.println("main thread end");
				break;
			} else
				Thread.sleep(1000);
		}

	}
}
