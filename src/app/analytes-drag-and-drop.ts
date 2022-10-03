import { isNullOrUndefined } from '@syncfusion/ej2-base';

export class AnalytesDragAndDrop {

    public static OnDragStopSingleChildCategories(args: any, analytesCategorySource: any, list: any, parentAnalytesList: any) {
        args.cancel = true;
        const newData: { [key: string]: Object }[] = [];

        const parentID = args.draggedNodeData['parentID'] as string;
        const analyteText = args.draggedNodeData['text'] as string;
        let analyteRegistryID = '' as string;
        let categoryName = '' as string;
        let standardUnit = '' as string;

        analytesCategorySource.map((_) => {
          if (_.analyteCategoriesID == parentID) {
            categoryName = _.name;
            const value = _.analytes.find((_) => _.name == analyteText);

            if (!isNullOrUndefined(value)) {
              analyteRegistryID = value.analyteRegistryID;
              standardUnit = value.standardUnit;
            }
          }
        });

        const newNodeSample: { [key: string]: any } = { pId: parentID, id: analyteRegistryID,
          text: analyteText, standardUnit: standardUnit};
        const newNodeSampleForListDataSource: { [key: string]: any } = { pId: parentID, id: analyteRegistryID,
          text: analyteText, standardUnit: standardUnit};
        newData.push(newNodeSampleForListDataSource);

        // Add collection of node to ListView
        const nodeList = list as any;
        const isAnalyteRegistryIDExists = nodeList.listData.find((f) => f.id == newNodeSample.id);
        if (!isNullOrUndefined(isAnalyteRegistryIDExists)) { return; } // block analytes duplication

        nodeList.addItem(newData, undefined);

        newNodeSample.categoryName = categoryName;
        newNodeSample.analytes = [];
        newNodeSample.analytes.push({
          pId: parentID,
          id: analyteRegistryID,
          text: analyteText,
          standardUnit: standardUnit
        });

        if (parentAnalytesList.length === 0) {
          parentAnalytesList.push(newNodeSample);
        } else {
          parentAnalytesList.map((_) => {

            if (_.pId == parentID) {
                const isAnalytesExists = _.analytes.find((f) => f.id == analyteRegistryID);
                if (!isAnalytesExists) {
                    _.analytes.push({
                        pId: parentID,
                        id: analyteRegistryID,
                        text: analyteText,
                        standardUnit: standardUnit
                    });
                }
            } else {
              const itemExists = parentAnalytesList.find((_) => _.pId == parentID);

              if (isNullOrUndefined(itemExists)) {
                parentAnalytesList.push(newNodeSample);
              }
            }
          });
        }
    }

    public static OnDragStopMultipleChildCategories(args: any , analytesCategorySource: any, list: any,
        parentAnalytesList: any, selelectedNodes: any) {
        args.cancel = true;
        const newData: { [key: string]: Object }[] = [];
        const parentID = args.draggedNodeData['parentID'] as string;
        const nodeList = list as any;

        for (let i: number = 0, len: number = selelectedNodes.length; i < len; i++) {
          let analyteText = '' as string;
          const analyteRegistryID = selelectedNodes[i] as string;
          let categoryName = '' as string;
          let standardUnit = '' as string;

          analytesCategorySource.map((_) => {
            if (_.analyteCategoriesID == parentID) {
              categoryName = _.name;
                const value = _.analytes.find((_) => _.analyteRegistryID == analyteRegistryID);

              if (!isNullOrUndefined(value)) {
                analyteText = value.name;
                standardUnit = value.standardUnit;
              }
            }
          });

          // Add collection of node to ListView
          const isAnalyteRegistryIDExists = nodeList.listData.find((f) => f.id == analyteRegistryID);

          if (isNullOrUndefined(isAnalyteRegistryIDExists)) {
            const newNodeSample: { [key: string]: any } = { pId: parentID, id: analyteRegistryID,
              text: analyteText, standardUnit: standardUnit};
            const newNodeSampleForListDataSource: { [key: string]: any } = { pId: parentID, id: analyteRegistryID,
              text: analyteText, standardUnit: standardUnit};
            newData.push(newNodeSampleForListDataSource);

            newNodeSample.categoryName = categoryName;
            newNodeSample.analytes = [];
            newNodeSample.analytes.push({
              pId: parentID,
              id: analyteRegistryID,
              text: analyteText,
              standardUnit: standardUnit
            });

            if (parentAnalytesList.length === 0) {
              parentAnalytesList.push(newNodeSample);
            } else {
              parentAnalytesList.map((_) => {

                if (_.pId == parentID) {

                    const isAnalytesExists = _.analytes.find((f) => f.id == analyteRegistryID);
                    if (!isAnalytesExists) {
                        _.analytes.push({
                            pId: parentID,
                            id: analyteRegistryID,
                            text: analyteText,
                            standardUnit: standardUnit
                        });
                    }
                } else {
                    const itemExists = parentAnalytesList.find((_) => _.pId == parentID);

                  if (isNullOrUndefined(itemExists)) {
                    parentAnalytesList.push(newNodeSample);
                  }
                }
              });
            }
          }
        }
        nodeList.addItem(newData, undefined);
    }

    public static OnDragStopParentCategories(args: any, analytesCategorySource: any, list: any, parentAnalytesList: any) {

        args.cancel = true;
        const newData: { [key: string]: Object }[] = [];

        const parentID = args.draggedNodeData['id'] as string;
        const categoryName = args.draggedNodeData['text'] as string;

        const analytes = analytesCategorySource.find((_) => _.analyteCategoriesID == parentID).analytes;

        // Add collection of node to ListView
        const nodeList = list as any;

        analytes.map((a) => {
          const isAnalyteRegistryIDExists = nodeList.listData.find((f) => f.id == a.analyteRegistryID);

          if (isNullOrUndefined(isAnalyteRegistryIDExists)) {
            const newNodeSample: { [key: string]: any } = { pId: parentID, id: a.analyteRegistryID,
              text: a.name, standardUnit: a.standardUnit};
            const newNodeSampleForListDataSource: { [key: string]: any } = { pId: parentID, id: a.analyteRegistryID,
              text: a.name, standardUnit: a.standardUnit};
            newData.push(newNodeSampleForListDataSource);

            newNodeSample.categoryName = categoryName;
            newNodeSample.analytes = [];
            newNodeSample.analytes.push({
              pId: parentID,
              id: a.analyteRegistryID,
              text: a.name,
              standardUnit: a.standardUnit
            });

            if (parentAnalytesList.length === 0) {
              parentAnalytesList.push(newNodeSample);
            } else {
              parentAnalytesList.map((_) => {

                if (_.pId == parentID) {
                    const isAnalytesExists = _.analytes.find((f) => f.id == a.analyteRegistryID);
                    if (!isAnalytesExists) {
                        _.analytes.push({
                            pId: parentID,
                            id: a.analyteRegistryID,
                            text: a.name,
                            standardUnit: a.standardUnit
                          });
                    }
                } else {
                  const itemExists = parentAnalytesList.find((_) => _.pId == parentID);

                  if (isNullOrUndefined(itemExists)) {
                    parentAnalytesList.push(newNodeSample);
                  }
                }
              });
            }
          }
        });
        nodeList.addItem(newData, undefined);
    }

    public static transAnalytesCategoryData(analytesCategorySource): any[] {
      const result: any[] = [];
      for (const category of analytesCategorySource) {
        for (const analytes of category.analytes) {
          if (result.length !== 0 && result.find((t) => t.analyteCategoriesID == category.analyteCategoriesID) != undefined) {
              result.find((t) => t.analyteCategoriesID == category.analyteCategoriesID).analytes.push({
                analyteCategoriesID: analytes.analyteRegistryID,
                  analyteRegistryID: analytes.analyteRegistryID,
                  categoryID: analytes.categoryID,
                  name:  analytes.name,
                  standardUnit: analytes.standardUnit
              });
          } else {
              result.push({
                analyteCategoriesID: category.analyteCategoriesID,
                name: category.name,
                analytes: [{
                  analyteCategoriesID: analytes.analyteRegistryID,
                  analyteRegistryID: analytes.analyteRegistryID,
                  categoryID: analytes.categoryID,
                  name:  analytes.name,
                  standardUnit: analytes.standardUnit
                }]
              });
          }
        }
      }
      return Object.assign([], result);
    }
}
