package edu.dlut.software.cagetian;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import edu.dlut.software.cagetian.LiepinCraw;
import edu.dlut.software.cagetian.beans.JobDetail;
import edu.dlut.software.cagetian.beans.JobInfo;
public class CrawUtils {
	private static int flag_erro = 0;
	private static int count = 0;
	public static final int SAVE_TO_MYSQL = 1;
	public static final int SAVE_TO_LOCAL = 2;
	public static final int SAVE_TO_HDFS = 3;
	private static List<String> user_agent_li = new ArrayList<String>();
	static {
		user_agent_li.add("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 UBrowser/4.0.3214.0 Safari/537.36");
		user_agent_li.add(
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.3.4000 Chrome/30.0.1599.101 Safari/537.36");
		user_agent_li.add(
				"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SV1; QQDownload 732; .NET4.0C; .NET4.0E; SE 2.X MetaSr 1.0) ");
		user_agent_li.add("Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0");
		user_agent_li
				.add("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E) ");
		user_agent_li.add("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)");
		user_agent_li.add("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E; LBBROWSER)");
		user_agent_li.add(
				"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER) ");
		user_agent_li.add(
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER");
		user_agent_li.add(
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11");
		user_agent_li.add(
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36");
		user_agent_li.add(
				"Opera/8.0 (Windows NT 5.1; U; en)");
		user_agent_li.add(
				"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0");

	}

	public static JobDetail parseDetail(String url) {
		JobDetail jobDetail = new JobDetail();
		if (!url.contains("https://")) {
			url = "https://www.liepin.com" + url;
		}
		try {
			Connection conn = Jsoup.connect(url);
			String userAgent = getUserAgent(count++);
			conn.userAgent(userAgent);
			Document doc = conn.timeout(10000).get();
			String ele = doc.select("div.content.content-word").text();
			if (ele.equals("")) {
				System.out.println(url + " is null");
			}
			jobDetail.setUrl(url);
			jobDetail.setDetail(ele);
		} catch (IOException e) {
			if (flag_erro++ == 0)
				CrawDao.updateCrawPage(LiepinCraw.page);
			System.out.println("url= "+url);
			e.printStackTrace();
		}
		return jobDetail;
	}

	private static String getUserAgent(int index) {
		return user_agent_li.get(index % user_agent_li.size());
	}

	public static List<JobInfo> parseJobInfo(String url) {
		List<JobInfo> jobInfo_li = new ArrayList<JobInfo>();

		try {

			Document doc = Jsoup.connect(url).get();
			Elements ele_li = doc.getElementsByClass("sojob-list").get(0).getElementsByTag("li");
			Iterator<Element> it = ele_li.iterator();
			Element jobEl;
			while (it.hasNext()) {
				JobInfo jobInfo = new JobInfo();
				jobEl = it.next();
				// 关键字
				jobInfo.setId_type(LiepinCraw.ID_TYPE);
				// 职位名
				Element title = jobEl.getElementsByTag("h3").get(0);
				jobInfo.setJob_name(title.text());
				// url
				jobInfo.setUrl(title.getElementsByTag("a").get(0).attr("href"));
				// 薪资
				String sal = jobEl.getElementsByClass("text-warning").get(0).text();
				String[] tmp = sal.split("-");
				if (tmp.length == 2) {
					jobInfo.setSalary_low(Integer.parseInt(tmp[0].replaceAll("\\D", "")));
					jobInfo.setSalary_high(Integer.parseInt(tmp[1].replaceAll("\\D", "")));
				} else {
					jobInfo.setSalary_high(-1);
					jobInfo.setSalary_low(-1);
				}
				// 地区
				jobInfo.setArea(jobEl.getElementsByClass("area").get(0).text());
				// 学历要求
				String edu = jobEl.getElementsByClass("edu").get(0).text();
				int degree = -1;
				if (edu.contains("不限"))
					degree = 0;
				else if (edu.contains("大专"))
					degree = 1;
				else if (edu.contains("本科"))
					degree = 2;
				else if (edu.contains("硕士"))
					degree = 3;
				else if (edu.contains("博士"))
					degree = 4;
				else
					degree = 5;
				jobInfo.setDegree(degree);
				// 工作经验要求
				String exp = jobEl.getElementsByClass("condition").get(0).getElementsByTag("span").get(2).text();
				if (exp.contains("不限"))
					jobInfo.setExprience(0);
				else if (exp.matches(".*\\d.*"))
					jobInfo.setExprience(Integer.parseInt(exp.replaceAll("\\D", "")));
				else
					jobInfo.setExprience(-1);
				// 发出简历的时间
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
				Date date = new Date(sdf.parse(jobEl.getElementsByTag("time").get(0).attr("title")).getTime());
				jobInfo.setSend_time(date);
				// 公司名称
				jobInfo.setCompany_name(jobEl.getElementsByClass("company-name").get(0).text());
				// 行业
				Elements ind = jobEl.getElementsByClass("industry-link");
				if (ind.size() == 0) {
					ind = jobEl.getElementsByClass("field-financing");
					if (ind.size() != 0)
						jobInfo.setIndustry(ind.get(0).text());
				}

				// 职务标签
				Elements temp = jobEl.getElementsByClass("temptation");
				if (temp.size() != 0) {
					List<Element> tag_li = temp.get(0).getElementsByTag("span");
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < tag_li.size(); i++)
						sb.append(tag_li.get(i).text() + "#");
					
					try {
						jobInfo.setTemptation(sb.substring(0, sb.length() - 1));
					} catch (Exception e) {
						// TODO Auto-generated catch block
						System.out.print("tag ");
					}
				}
				// System.out.println(jobInfo);
				jobInfo_li.add(jobInfo);

			}

			// System.out.println(1);
		} catch (Exception e) {
			if (flag_erro++ == 0)
				CrawDao.updateCrawPage(LiepinCraw.page);
			System.out.println("url= "+url);
			e.printStackTrace();
		}

		return jobInfo_li;
	}

	public static void saveDetail(JobDetail jobDetail, int save_path) {
		// System.out.println(jobDetail);
		switch (save_path) {
		case SAVE_TO_LOCAL:
			File writename = new File(MyConstants.SAVE_DETAIL_PATH + System.currentTimeMillis() + ".txt"); // 相对路径，如果没有则要建立一个新的output。txt文件
			try {
				writename.createNewFile(); // 创建新文件
				BufferedWriter out = new BufferedWriter(new FileWriter(writename));
				out.write(jobDetail.getUrl() + "\r\n" + jobDetail.getDetail());
				out.flush(); // 把缓存区内容压入文件
				out.close(); // 最后记得关闭文件
				break;
			} catch (IOException e) {
				e.printStackTrace();
			}
		case SAVE_TO_MYSQL:
			CrawDao.insertDetail(jobDetail);
			break;
		}

	}
}
