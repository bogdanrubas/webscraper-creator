import React, { Component } from "react";
import Table from "layout/Table";
// import Icon from "layout/Icon";
// import Link from "next/link";
// import Router from "next/router";
// import { Spider } from "./styles";
import Crawler from "./Crawler";
// import { ISpider } from "./Spider";

interface CrawlersTableProps {
  loading?: any;
  error?: any;
  data?: any;
  subscribeToNewCrawlers: Function;
}

export default class CrawlersTable extends Component<CrawlersTableProps> {
  componentDidMount() {
    this.props.subscribeToNewCrawlers();
  }

  renderContent = () => {
    const { loading, error, data } = this.props;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;

    return (
      <Table>
        <thead>
          <tr>
            <td>Actions</td>
            <td>Name</td>
            <td>Last run</td>
            <td>Live status</td>
            {/* <td>Status</td>
            <td>Name</td>
            <td>Last update</td>
            <td>State</td>
            <td>Edit</td> */}
          </tr>
        </thead>
        <tbody>
          {data.crawlers.map((crawler: any) => (
            // <div>lolololo</div>
            <Crawler data={crawler} />
            // <tr key={spider.id} id={spider.id}>
            //   <td></td>
            //   <td>{spider.name}</td>
            //   <td></td>
            //   <td></td>
            //   <td>
            //     {/* <Link href={`account-spider/${spider.id}`}>
            //       <a> */}
            //     <Icon
            //       name="edit"
            //       size={20}
            //       strokeWidth={40}
            //       color="black"
            //       onClick={() => Router.push(`/account-spider/${spider.id}`)}
            //     />
            //     {/* </a>
            //     </Link> */}
            //   </td>
            // </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  render() {
    return this.renderContent();
  }
}
