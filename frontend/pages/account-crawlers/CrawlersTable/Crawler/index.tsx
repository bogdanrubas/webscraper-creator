import React, { useContext, useEffect } from "react";
import { CrawlerWrapper } from "./styles";
import Button from "layout/Button";
import Router, { useRouter } from "next/router";
import { ModalsContext } from "pages/account-crawlers/ctx/modalsContext";
import { UiContext } from "pages/account-crawlers/ctx/uiContext";

export interface ICrawler {
  data: any;
}

const Crawler: React.FunctionComponent<ICrawler> = ({ data }) => {
  const { toggleModal } = useContext(ModalsContext),
    { changeUiContext } = useContext(UiContext),
    router = useRouter();

  useEffect(() => {
    console.log(data);

  }, [])

  return (
    <>

      <CrawlerWrapper>
        <td className="actions">
          <Button
            buttonType="button"
            type="icon"
            iconName="edit"
            hintText="Edit crawler"
            onClick={() => {
              router.push(`/account-crawler/${data.id}`);
            }}
          />
          <Button
            buttonType="button"
            type="icon"
            iconName="delete"
            hintText="Delete crawler"
            onClick={() => {
              changeUiContext('actionAtCrawler', data);
              toggleModal("shouldShowDeleteCrawlerModal", true);
            }}
          />
        </td>
        <td>{data.name}</td>
        <td className="tableInTable">
          <table>
            <tr>
              <td title="Depth 1">Started</td>
              <td title="Depth 2">Errors ratio</td>
              <td title="Depth 3">Finished</td>
            </tr>

            <tr>
              <td>
                16:45 - <small>17.04.20</small>
              </td>
              <td>281/20/383 (6%)</td>
              <td>- || -</td>
            </tr>
          </table>
        </td>
        <td className="tableInTable">
          <table>
            <tbody>
              <tr>
                <td title="getCategories">1 (getCategories)</td>
                <td title="getProducts">2 (getProducts)</td>
                <td title="getData">3 (getData)</td>
              </tr>

              <tr>
                <td>
                  <b className="success" title="success: 1">
                    1
                  </b>
                  /
                  <b className="error" title="errors: 0">
                    0
                  </b>{" "}
                  (100%) {"=> "}
                  <b className="success" title="success: 1">
                    42
                  </b>
                  /
                  <b className="error" title="errors: 0">
                    0
                  </b>
                </td>
                <td>
                  <b className="success" title="">
                    38
                  </b>
                  /<b className="error">2</b>/<b>42</b> (95%) {"=> "}
                  <b className="success" title="success: 1">
                    340
                  </b>
                  /
                  <b className="error" title="errors: 0">
                    16
                  </b>
                </td>
                <td>
                  <b className="success">242</b>/<b className="error">18</b>/340
                  (71%) {"=> "}
                  <b className="success" title="">
                    230
                  </b>
                  /<b className="error">12</b>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </CrawlerWrapper>

      {/* <CrawlerWrapper>
        <td className="actions">
          <Button
            buttonType="button"
            type="icon"
            icon="edit"
            hintText="Edit crawler"
            onClick={() => {}}
          />
          <Button
            buttonType="button"
            type="icon"
            icon="history"
            hintText="Previous runs"
            onClick={() => {}}
          />
          <Button
            buttonType="button"
            type="icon"
            icon="delete"
            hintText="Delete crawler"
            onClick={() => {}}
          />
        </td>
        <td>Unisono - bluzka A105</td>
        <td className="tableInTable">
          <table>
            <tr>
              <td title="Depth 1">Started</td>
              <td title="Depth 2">Errors ratio</td>
              <td title="Depth 3">Finished</td>
            </tr>

            <tr>
              <td>
                12:45 - <small>17.04.20</small>
              </td>
              <td>1/0 (0%)</td>
              <td>
                12:46 - <small>17.04.20</small>
              </td>
            </tr>
          </table>
        </td>
        <td className="tableInTable">
          <table>
            <tbody>
              <tr>
                <td title="getData">1 (getData)</td>
              </tr>

              <tr>
                <td>
                  <b className="success" title="success: 1">
                    1
                  </b>
                  /
                  <b className="error" title="errors: 0">
                    0
                  </b>{" "}
                  (100%)
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </CrawlerWrapper>

      <CrawlerWrapper>
        <td className="actions">
          <Button
            buttonType="button"
            type="icon"
            icon="edit"
            hintText="Edit crawler"
            onClick={() => {}}
          />
          <Button
            buttonType="button"
            type="icon"
            icon="history"
            hintText="Previous runs"
            onClick={() => {}}
          />
          <Button
            buttonType="button"
            type="icon"
            icon="delete"
            hintText="Delete crawler"
            onClick={() => {}}
          />
        </td>
        <td>Unisono - buty B306</td>
        <td className="tableInTable">
          <table>
            <tr>
              <td title="Depth 1">Started</td>
              <td title="Depth 2">Errors ratio</td>
              <td title="Depth 3">Finished</td>
            </tr>

            <tr>
              <td>
                12:45 - <small>17.04.20</small>
              </td>
              <td>0/1 (100%)</td>
              <td>
                12:46 - <small>17.04.20</small>
              </td>
            </tr>
          </table>
        </td>
        <td className="tableInTable">
          <table>
            <tbody>
              <tr>
                <td title="getData">1 (getData)</td>
              </tr>

              <tr>
                <td>
                  <b className="success" title="success: 1">
                    0
                  </b>
                  /
                  <b className="error" title="errors: 0">
                    1
                  </b>{" "}
                  (100%)
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </CrawlerWrapper> */}
    </>
  );
};

export default Crawler;
