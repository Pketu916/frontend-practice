import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    articles = [
        {
            "source": {
                "id": "associated-press",
                "name": "Associated Press"
            },
            "author": "JILL LAWLESS",
            "title": "UK’s Starmer in Kyiv for security talks with a pledge for a ‘100-year partnership’ with Ukraine - The Associated Press",
            "description": "British Prime Minister Keir Starmer has arrived in Ukraine's capital with a pledge to help guarantee the country’s security for a century, days before Donald Trump is to be sworn in as U.S. president. The British government says Starmer and Ukrainian Presiden…",
            "url": "https://apnews.com/article/russia-ukraine-zelenskyy-starmer-putin-uk-britain-nato-c030b163628583a322f39729160646cc",
            "urlToImage": "https://dims.apnews.com/dims4/default/d86827a/2147483647/strip/true/crop/8640x4860+0+450/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F6f%2F03%2Fa8c2f6e633338fba18204d6b1756%2Fc2473fdac28a48efbd9d96756c98156f",
            "publishedAt": "2025-01-16T10:20:00Z",
            "content": "KYIV, Ukraine (AP) British Prime Minister Keir Starmer arrived in Ukraines capital on Thursday with a pledge to help guarantee the countrys security for a century, days before Donald Trump is sworn i… [+4914 chars]"
        },
        {
            "source": {
                "id": "associated-press",
                "name": "Associated Press"
            },
            "author": "TIA GOLDENBERG, WAFAA SHURAFA, SAMY MAGDY",
            "title": "Netanyahu says Cabinet won't meet over ceasefire until Hamas backs down from 'last minute crisis' - The Associated Press",
            "description": "Prime Minister Benjamin Netanyahu said Thursday that a “last minute crisis” with Hamas was holding up Israeli approval of a long-awaited agreement to pause the fighting in the Gaza Strip and release dozens of hostages. Israeli airstrikes meanwhile killed doze…",
            "url": "https://apnews.com/article/israel-palestinians-hamas-war-news-ceasefire-hostages-01-16-2024-dc0ef64dd52db395c5a54328518e8efd",
            "urlToImage": "https://dims.apnews.com/dims4/default/cd11b00/2147483647/strip/true/crop/8640x4860+0+450/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F5c%2F59%2F59296f6b288a051cf8c9c7dcfe0e%2F146026970d744e6bae6cfc5ea3be8137",
            "publishedAt": "2025-01-16T08:55:00Z",
            "content": "TEL AVIV, Israel (AP) Prime Minister Benjamin Netanyahu said Thursday that a last minute crisis with Hamas was holding up Israeli approval of a long-awaited agreement to pause the fighting in the Gaz… [+6070 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": "https://www.facebook.com/bbcnews",
            "title": "Israel's cabinet set to approve ceasefire deal as at least 20 killed in strikes on Gaza - BBC.com",
            "description": "Israel's military says a rocket was also fired into its territory from Gaza, ahead of a truce which is set to begin on Sunday.",
            "url": "https://www.bbc.com/news/live/c3rwqpj70ert",
            "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png",
            "publishedAt": "2025-01-16T08:03:45Z",
            "content": "Damian GrammaticasPolitical correspondent\r\nThe Foreign Secretary David Lammy has said the UK government hopes Emily Demari, the one remaining hostage with British citizenship who is being held in Gaz… [+1264 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Space.com"
            },
            "author": "Brett Tingley, Josh Dinner",
            "title": "Jeff Bezos' Blue Origin launches massive New Glenn rocket into orbit on 1st flight (video) - Space.com",
            "description": "New Glenn just earned its wings.",
            "url": "https://www.space.com/space-exploration/launches-spacecraft/jeff-bezos-blue-origin-launches-massive-new-glenn-rocket-into-orbit-on-1st-flight-video",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/ozoFtNbBJTmP8RGterkkWC-1200-80.jpg",
            "publishedAt": "2025-01-16T07:58:36Z",
            "content": "COCOA BEACH, Florida  —  Blue Origin's New Glenn rocket just earned its wings.\r\nNew Glenn launched for the first time ever this morning (Jan. 16), rising off a pad at Cape Canaveral Space Force Stati… [+6213 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Variety"
            },
            "author": "Naman Ramachandran",
            "title": "Bollywood Star Saif Ali Khan Stabbed Multiple Times in Mumbai Home Invasion Attack - Variety",
            "description": "Bollywood star Saif Ali Khan undergoes emergency surgery after sustaining stab wounds during late-night home invasion at his Mumbai residence.",
            "url": "https://variety.com/2025/film/news/saif-ali-khan-stabbed-1236275567/",
            "urlToImage": "https://variety.com/wp-content/uploads/2025/01/Saif-Ali-Khan1.jpg?w=1000&h=563&crop=1",
            "publishedAt": "2025-01-16T07:15:00Z",
            "content": "Bollywood actor Saif Ali Khan underwent emergency surgery at Mumbai’s Lilavati Hospital following a knife attack at his Bandra residence early Thursday morning. The 54-year-old actor sustained multip… [+2632 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Kyiv Post"
            },
            "author": "John Moretti",
            "title": "‘It’s Such a Disaster’ – Ukraine at War Update for Jan. 16 - Kyiv Post",
            "description": "Energy wars continue as Kyiv’s drones hit oil depot in Voronezh; Zelensky welcomes return of 25 POWs as Ukraine captures 23 more; Biden adds another layer of Russian sanctions before he steps down.",
            "url": "https://www.kyivpost.com/post/45504",
            "urlToImage": "https://static.kyivpost.com/storage/2025/01/16/729e03136060184facf2e7b316938243.jpeg?w=1200&q=90&f=jpg",
            "publishedAt": "2025-01-16T06:22:30Z",
            "content": "The governor of Russia’s Voronzezh region, Alexander Gusev, reported on social media that a drone attack struck an oil depot there on Wednesday evening. Gusev claimed that Russian air defense units a… [+5419 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Hollywood Reporter"
            },
            "author": "Lovia Gyarkye",
            "title": "‘One of Them Days’ Review: Keke Palmer and SZA Make a Rowdily Funny Duo in Issa Rae-Produced Comedy - Hollywood Reporter",
            "description": "Two friends race to avoid eviction in this comedy directed by Lawrence Lamont and co-starring Vanessa Bell Calloway, Lil Rel Howery, Katt Williams, Janelle James and Maude Apatow.",
            "url": "http://www.hollywoodreporter.com/movies/movie-reviews/one-of-them-days-review-keke-palmer-sza-1236107759/",
            "urlToImage": "https://www.hollywoodreporter.com/wp-content/uploads/2025/01/C_0005C002_240717_004548_H1F52_g_Rec709.086566_rv2.jpg?crop=448px%2C0px%2C3228px%2C1808px&resize=1440%2C810",
            "publishedAt": "2025-01-16T06:20:57Z",
            "content": "Few moments provoke more anxious dread for residents of The Jungles, the vibrant Los Angeles locale in which the hilarious new film One of Them Days is set, than the first of the month. Their surly l… [+4907 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "9to5google.com"
            },
            "author": "Abner Li",
            "title": "Samsung Galaxy S25 leak shows new Gemini overlay, hotword, and more - 9to5Google",
            "description": "Ahead of next week’s Samsung event, the Galaxy S25 leaks continue and the latest marketing reveals the Gemini experience.",
            "url": "http://9to5google.com/2025/01/15/samsung-s25-gemini-overlay/",
            "urlToImage": "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/01/Gemini-overlay-Galaxy-S25.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
            "publishedAt": "2025-01-16T06:17:00Z",
            "content": "Ahead of next weeks Samsung event, the Galaxy S25 leaks continue and the latest marketing reveals the Gemini experience.\r\nIn S25 marketing material shared by Tecnoblog (via Android Authority), we see… [+1377 chars]"
        },
        {
            "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
            },
            "author": "Maegan Vazquez",
            "title": "Ukraine hawk removed from House intelligence role, reportedly at Trump’s request - The Washington Post",
            "description": "The move by Speaker Mike Johnson provides the latest evidence of a changing posture more favorable to Russia under Donald Trump.",
            "url": "https://www.washingtonpost.com/politics/2025/01/15/ukraine-hawk-removed-house-intelligence-role-reportedly-trump-request/",
            "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/6FTAWQKOP324LUXGU46PG55UIY.jpg&w=1440",
            "publishedAt": "2025-01-16T05:10:00Z",
            "content": "House Speaker Mike Johnson (R-Louisiana) has decided to remove Rep. Michael R. Turner (R-Ohio) as chair of the House Permanent Select Committee on Intelligence, Johnson confirmed Wednesday.\r\nThe chan… [+3248 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "CBS Sports"
            },
            "author": "",
            "title": "WATCH: Ja Morant posterizes Victor Wembanyama in one of the coolest dunks ever, but it didn't count - CBS Sports",
            "description": "Sadly, Morant's incredible dunk came after the whistle",
            "url": "https://www.cbssports.com/nba/news/watch-ja-morant-posterizes-victor-wembanyama-in-one-of-the-coolest-dunks-ever-but-it-didnt-count/",
            "urlToImage": "https://sportshub.cbsistatic.com/i/r/2025/01/16/160e4f27-c8e7-4399-bd5f-024f6c6edb76/thumbnail/1200x675/109121e18c271d1efce0a175cddfabf9/ja-poster-usatsi.png",
            "publishedAt": "2025-01-16T04:15:00Z",
            "content": "Victor Wembanyama may be the single most imposing rim protector in NBA history. He's only in his second season, but his combination of elite athleticism for his size, stellar shot-blocking instincts … [+2428 chars]"
        },
        {
            "source": {
                "id": "the-hill",
                "name": "The Hill"
            },
            "author": "Lauren Irwin",
            "title": "Democratic senator says he is currently a no on Bondi: ‘I am trying to be fair’ - The Hill",
            "description": "Democratic Senator Chris Coons (Del.) said after Wednesday’s hearing on President-elect Trump’s attorney general pick Pam Bondi he will currently vote no, but he wants “to be fair.” Coons joined CNN’s “The Source” Wednesday, where he was asked about the quest…",
            "url": "https://thehill.com/homenews/senate/5088632-democratic-senator-says-he-is-currently-a-no-on-bondi-i-am-trying-to-be-fair/",
            "urlToImage": "https://thehill.com/wp-content/uploads/sites/2/2024/05/coonschris_052124gn01_w.jpg?w=1280",
            "publishedAt": "2025-01-16T03:40:00Z",
            "content": "Skip to content\r\nDemocratic Senator Chris Coons (Del.) said after Wednesday’s hearing on President-elect Trump’s attorney general pick Pam Bondi he will currently vote no, but he wants “to be fair.”\r… [+2086 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Cyclonefanatic.com"
            },
            "author": "View articles by Connor Ferguson",
            "title": "What Kansas coach Bill Self said about Iowa State following Wednesday’s game - Cyclone Fanatic",
            "description": "AMES, IA - JANUARY 15: Head coach Bill Self of the Kansas Jayhawks coaches from the bench in the first half of play against the Iowa State Cyclones at Hilton Coliseum on January 15, 2025, in Ames, Iowa. (Photo by David Purdy/Getty Images)\n\n\n\nAMES - Following …",
            "url": "https://cyclonefanatic.com/2025/01/what-kansas-coach-bill-self-said-about-iowa-state/",
            "urlToImage": "https://cyclonefanatic.com/wp-content/uploads/2025/01/2193525175-scaled.jpg",
            "publishedAt": "2025-01-16T03:25:12Z",
            "content": "AMES, IA – JANUARY 15: Head coach Bill Self of the Kansas Jayhawks coaches from the bench in the first half of play against the Iowa State Cyclones at Hilton Coliseum on January 15, 2025, in Ames, Io… [+2974 chars]"
        },
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Madeline Holcombe",
            "title": "Keep your red meat to these limits to protect your brain health, experts say - AOL",
            "description": "Eating too much red meat has been associated with poor health outcomes, but a new study shows it could also put your future cognitive health at risk.",
            "url": "https://www.cnn.com/2025/01/15/health/red-meat-dementia-wellness/index.html",
            "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1396919018.jpg?c=16x9&q=w_800,c_fill",
            "publishedAt": "2025-01-16T03:11:15Z",
            "content": "Sign up for CNNs Eat, But Better: Mediterranean Style. Our eight-part guide shows you a delicious expert-backed eating lifestyle that will boost your health for life.\r\nReducing your red meat consumpt… [+4776 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "MLB Trade Rumors"
            },
            "author": "Mark Polishuk",
            "title": "Dodgers Having \"Exploratory\" Talks About Trading For Int'l Bonus Pool Funds - MLB Trade Rumors",
            "description": "10:10PM: The Padres are also looking to trade for more int'l signing pool space, MLB.com's Mark Feinsand writes (multiple links).  &hellip;",
            "url": "https://www.mlbtraderumors.com/2025/01/dodgers-having-exploratory-talks-about-trading-for-intl-bonus-pool-funds.html",
            "urlToImage": "https://cdn.mlbtraderumors.com/files/2024/11/roki-sasaki-1024x683.jpg",
            "publishedAt": "2025-01-16T03:07:49Z",
            "content": "10:10PM: The Padres are also looking to trade for more int’l signing pool space, MLB.com’s Mark Feinsand writes (multiplelinks).  More teams than just the Sasaki suitors are also exploring such trade… [+3906 chars]"
        },
        {
            "source": {
                "id": "axios",
                "name": "Axios"
            },
            "author": "Rebecca Falconer",
            "title": "Transportation Department sues Southwest, fines Frontier Airlines over chronic flight delays - Axios",
            "description": "This \"sends a message to all airlines\" that DOT will go to court in order \"to enforce passenger protections,\" Pete Buttigieg said.",
            "url": "https://www.axios.com/2025/01/16/southwest-airlines-sued-us-frontier-flight-delays",
            "urlToImage": "https://images.axios.com/Asgi5jjel5dPdJ4QwryRBu10VCk=/0x82:2653x1575/1366x768/2025/01/16/1736988337230.jpg",
            "publishedAt": "2025-01-16T02:32:52Z",
            "content": "Southwest Airlines is being sued and Frontier Airlines fined over chronic flight delays by the Department of Transportation, the DOT announced Wednesday.\r\nWhy it matters: Wednesday's announcement by … [+2776 chars]"
        },
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": null,
            "title": "March Madness will pay women’s teams under a new structure approved by the NCAA - CNN",
            "description": "NASHVILLE (AP) — Women’s basketball teams finally will be paid for playing games in the NCAA Tournament each March just like the men have for years under a plan approved Wednesday at the NCAA convention.",
            "url": "https://www.cnn.com/2025/01/15/sport/march-madness-womens-ncaa-spt/index.html",
            "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1478617680.jpg?c=16x9&q=w_800,c_fill",
            "publishedAt": "2025-01-16T02:29:00Z",
            "content": "NASHVILLE (AP)Womens basketball teams finally will be paid for playing games in the NCAA Tournament each March just like the men have for years under a plan approved Wednesday at the NCAA convention.… [+6719 chars]"
        },
        
        {
            "source": {
                "id": null,
                "name": "CNBC"
            },
            "author": "Lee Ying Shan, Amala Balakrishner",
            "title": "Asia-Pacific markets track Wall Street gains; South Korea unexpectedly keeps rates unchanged - CNBC",
            "description": "Korea's central bank surprised market watchers by keeping base rates unchanged at 3%.",
            "url": "https://www.cnbc.com/2025/01/16/asia-markets-live-updates.html",
            "urlToImage": "https://image.cnbcfm.com/api/v1/image/108073175-1733755525123-gettyimages-2188421422-AA_09122024_1980684.jpeg?v=1736984339&w=1920&h=1080",
            "publishedAt": "2025-01-16T01:10:00Z",
            "content": "Asia-Pacific markets mostly climbed Thursday, after U.S. markets soared on the back of an unexpected decline in core inflation numbers in December and strong bank earnings.\r\nKorea's central bank surp… [+1607 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Deadline"
            },
            "author": "Patrick Hipes",
            "title": "Trump Inauguration Performers: Kid Rock, Billy Ray Cyrus, Underwood, More - Deadline",
            "description": "Kid Rock, the Village People, Billy Ray Cyrus, Lee Greenwood, Rascal Flatts, Jason Aldean and more will perform during Donald Trump's inauguration.",
            "url": "http://deadline.com/2025/01/donald-trump-inauguration-performers-1236258118/",
            "urlToImage": "https://deadline.com/wp-content/uploads/2025/01/Kid-Rock-Billy-Ray-Cyrus-the-Village-People-and-Lee-Greenwood.jpg?w=1024",
            "publishedAt": "2025-01-16T00:09:00Z",
            "content": "Carrie Underwood will be joined by performers including Kid Rock, the Village People, Billy Ray Cyrus, Lee Greenwood, Rascal Flatts, Jason Aldean and more over the weekend and Monday as part of Donal… [+2312 chars]"
        }
    ]
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loadind: false,
        }
    }

    render() {
        return (
            <div className='container my-3' >
                <h2>top Headlines</h2>
                <div className='row mt-5' >

                    {this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}  >
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>

                    })}

                </div>
            </div>
        )
    }
}

export default News
