<template>
  <v-container fluid  class="fill-height d-flex align-start" color="grey lighten-5">
    <v-row >
      

      <v-col cols="8">
        
        <v-tabs
          v-model="currentTabItem"
          fixed-tabs
          slider-color="white">
          <v-tab
            v-for="(typeTab, index) in bitss_types"
            :key="index"
            :href="'#tab-' + typeTab">
            {{ typeTab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTabItem">
          <v-tab-item
            v-for="(typeTab, index) in bitss_types"
            :key="index"
            :value="'tab-' + typeTab">
            <v-card flat class="py-4 px-8">
              <template v-for="(typeList, index) in filtered_type_value">
                
                <template v-if="typeList.type === typeTab">

                  <template v-if="typeTab === 'free'">
                    <v-alert
                      :key="index"
                      text
                      dense
                      color="teal"
                      icon="mdi-clock-fast"
                      border="left">
                      <b>NOTE:</b> Choose one only. 
                    </v-alert>
                    <v-data-table
                      v-model="table_parent_model_[index]"
                      :headers="typeHeaders"
                      :items="typeList.typeData"
                      :single-select="true"
                      show-select
                      item-key="subCategory"
                      item-class="row_classes"
                      :search="search">
                      <template v-slot:header.price="{ on , props }">

                      </template>
                      <template v-slot:item.subCategory="{ item }">
                        {{company_name}}.{{item.subCategory}}
                      </template>
                      <template v-slot:item.price="{ item }">
                        <template v-if="item.price">
                          ${{item.price}}
                        </template>
                      </template>
                    </v-data-table>
                  </template>
                  <template v-if="typeTab === 'premium'">
                    <v-data-table
                      v-model="table_parent_model_[index]"
                      :headers="typeHeaders"
                      :items="typeList.typeData"
                      show-select
                      item-key="subCategory"
                      item-class="row_classes"
                      :search="search">

                      <template v-slot:item.subCategory="{ item }">
                        {{company_name}}.{{item.subCategory}}
                      </template>
                      <template v-slot:item.price="{ item }">
                        <template v-if="item.price">
                          ${{item.price}}
                        </template>
                      </template>
                    </v-data-table>
                  </template>
                </template>
              </template>

              <v-card-text>
                  
                <template v-if="typeTab === 'package'">
                  <v-tabs
                   v-model="subcurrentTabItem"
                    fixed-tabs
                    slider-color="white">
                    <v-tab
                      v-for="i in api"
                      :key="i.category"
                      :href="'#tab-' + i.category">
                      {{ i.category }} -  ${{i.totalPrice}}
                    </v-tab>
                  </v-tabs>
                  
                  <v-tabs-items v-model="subcurrentTabItem">
                    <v-tab-item
                      v-for="(i, j) in api"
                      :key="j"
                      :value="'tab-' + i.category">
                      
                      <v-card flat>
                        <v-card-text>

                          <template v-for="(category, index) in filtered_category">
                            
                            <template v-if="category.category === i.category">
                              <v-data-table

                                class="child-table"
                                v-model="table_model_[index]"
                                :headers="subHeaders"
                                :items="category.subCategories"
                                item-key="subCategory"
                                show-select
                                item-class="row_classes"
                                :search="search">
                                  <!-- <template v-slot:header.data-table-select="{ on , props }">

                                  </template> -->
                                  <template v-slot:item.subCategory="{ item }">
                                    {{company_name}}.{{item.subCategory}}
                                  </template>
                                  <template v-slot:item.price="{ item }">
                                    <template v-if="item.price">
                                      ${{item.price}}
                                    </template>
                                  </template>
                              </v-data-table>
                            </template>
                          </template>

                          
                          
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>


                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        
      </v-col>
      <v-col cols="4">
        <v-sheet color="white" class="fill-height px-6 py-4">
          
          <!-- {{filter_subCategory_taken(table_parent_model_[0], table_parent_model_[1], table_model_[0], table_model_[1], table_model_[2])}} -->
          <v-text-field
            label="Company Name"
            v-model="company_name"
            color="primary"
            dense
            elevation="0"
            class="py-2 mb-4"
            outlined
          ></v-text-field>

          <v-text-field
            label="Company URL"
            v-model="companyUrl"
            color="primary"
            dense
            elevation="0"
            class="py-2 mb-4"
            outlined
          ></v-text-field>
          
          <template v-if="get_type(table_parent_model_[0]) == 'free' && filtered_table_merged(table_parent_model_[1]).length == 1">
            <v-data-table
            :headers="headers"
            :items="table_parent_model_[0]"
            :hide-default-footer="true"
            item-class="row_classes">
              <template v-slot:header.price="{ on , props }">

              </template>
              <template v-slot:item.price="{ item }">
                <template v-if="item.price">
                </template>
              </template>
            </v-data-table>
            <br/><br/>
            
            <v-dialog
              v-model="dialogFree"
              persistent
              max-width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn block
                  v-bind="attrs"
                  v-on="on"
                  :disabled="company_name.length == 0"
                  color="primary"
                  class="py-6 px-10">
                  SEND
                </v-btn>
              
              </template>
              <v-card>
                <v-card-title class="headline">
                  SHARE
                </v-card-title>
                <v-card-text>
                  
                  <v-text-field @click:append="copyText" outlined append-icon="mdi-content-copy" readonly :v-model="get_bitss_single_value(table_parent_model_[0])" ref="textToCopy" :value="get_bitss_single_value(table_parent_model_[0])"></v-text-field>
                  <v-btn @click="copyText">copy</v-btn>
                  <v-btn color="green">Share</v-btn>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey darken-1"
                    text
                    @click="dialogFree = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="dialogFree = false"
                  >
                    SEND
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </template>
          <template v-else>  
            <template v-if="filtered_table_merged(table_parent_model_[0], table_parent_model_[1]).length != 1"> 
              <v-data-table
                :headers="headers"
                :items="filtered_table_merged(table_parent_model_[0], table_parent_model_[1])"
                :hide-default-footer="true"
                item-class="row_classes">
              </v-data-table>
            </template>
          </template>

          <template v-for="(category, index) in filtered_category">
            <template v-if="filtered_table_merged(table_model_[index]).length != 1">
              <v-row>
                <v-col cols="8">
                  <h5>{{category.category}}</h5>
                </v-col>
                <v-col cols="4">
                  <template v-if="category.totalPrice">
                    <b>${{category.totalPrice}}</b>
                  </template>
                </v-col>
              </v-row>
              <v-data-table
                :headers="packageHeaders"
                :items="filtered_table_merged(table_model_[index])"
                :hide-default-footer="true"
                item-class="row_classes">
              </v-data-table>
            </template>
          </template>

          <template v-if="(get_type(table_parent_model_[0]) == 'free' && filtered_table_merged(table_parent_model_[1]).length != 1) || filtered_table_merged(table_model_[0]).length != 1 || filtered_table_merged(table_model_[1]).length != 1 || filtered_table_merged(table_model_[2]).length != 1">
            <hr/>
            <br/>
            <h4>Choose Plan Type:</h4>
            
            <v-radio-group
              v-model="planTypes"
              column>
              <v-radio
                label="per month"
                color="primary"
                value="planTypeMonths"></v-radio>
              <v-radio
                label="3 months"
                color="primary"
                value="planType3Months"></v-radio>
              <v-radio
                label="6 months"
                color="primary"
                value="planType6Months"></v-radio>
              <v-radio
                label="12 months"
                color="primary"
                value="planType12Months"></v-radio>
            </v-radio-group>
              

            <p style="text-align: right;"><b>Total: ${{filtered_total_cost(table_parent_model_[0], table_parent_model_[1], table_model_[0], table_model_[1], table_model_[2])}}</b></p>
          
            <br/><br/>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn block
                  v-bind="attrs"
                  v-on="on"
                  :disabled="company_name.length == 0"
                  color="primary"
                  class="py-6 px-10">
                  SEND
                </v-btn>
              
              </template>
              <v-card>
                <v-card-title class="headline">
                  CHECKOUT
                </v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="filtered_table_merged(table_parent_model_[0], table_parent_model_[1])"
                    :hide-default-footer="true"
                    item-class="row_classes">
                  </v-data-table>
                  <hr/>
                  <br/><br/>
                  <template v-for="(category, index) in filtered_category">
                    <template v-if="filtered_table_merged(table_model_[index]).length != 1">
                      <v-row>
                        <v-col cols="8">
                          <h5>{{category.category}}</h5>
                        </v-col>
                        <v-col cols="4">
                          <template v-if="category.totalPrice">
                            <b>${{category.totalPrice}}</b>
                          </template>
                        </v-col>
                      </v-row>
                      <v-data-table
                        :headers="packageHeaders"
                        :items="filtered_table_merged(table_model_[index])"
                        :hide-default-footer="true"
                        item-class="row_classes">
                      </v-data-table>
                    </template>
                  </template>

                  <hr/>
                  <br/>
                  <p style="text-align: right;"><b>Total: 
                    <template v-if="filtered_total_cost(table_parent_model_[0], table_parent_model_[1], table_model_[0], table_model_[1], table_model_[2])">
                      0.00
                    </template>
                    <template v-else>
                      ${{filtered_total_cost(table_parent_model_[0], table_parent_model_[1], table_model_[0], table_model_[1], table_model_[2])}}
                    </template>
                  </b></p>
                  <br/><br/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey darken-1"
                    text
                    @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="dialog = false"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-else>
            
          </template>

        </v-sheet> 
        
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import _ from 'lodash';
import _map from 'lodash/map';
import _filter from 'lodash/filter';


export default {
  layout: 'dashboard',
  data() {
    return {
      dialog: false,
      dialogFree: false,
      companyName: this.$route.query.company_name,
      companyUrl: this.$route.query.company_url,
      search: '',
      currentTabItem: 'tab-Web',
      subcurrentTabItem: '',
      api: [],
      planTypes: 'planTypeMonths',
      table_parent_model_: [],
      result_table_: [],
      table_model_: [],
      itemSelected: [],
      type_table_: [],
      reservedItem: {
        subCategory: '',
        totalPrice: '',
      },
      indexItem: -1,
      bitss_types: [
        'free', 'premium', 'package',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      headers: [
        {
          text: 'Domain',
          align: 'start',
          sortable: false,
          value: 'subCategory',
        },
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Price',
          align: 'start',
          sortable: false,
          value: 'price',
        },
        
      ],
      packageHeaders: [
        {
          text: 'Domain',
          align: 'start',
          sortable: false,
          value: 'subCategory',
        },
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        
      ],
      typeHeaders: [
        {
          text: 'Domain',
          align: 'start',
          sortable: false,
          value: 'subCategory',
        },
        {
          text: 'Price',
          align: 'start',
          sortable: false,
          value: 'price',
        },
      ],
      subHeaders: [
        {
          text: 'Domain',
          align: 'start',
          sortable: false,
          value: 'subCategory',
        },
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Price',
          align: 'start',
          sortable: false,
          value: 'price',
        },
        // {text: 'Action', value: 'actions', sortable: false},
      ],
      
      
    }
  },
  created () {
    this.initialize()
  },
  watch: {
    
  },
  methods: {
    // singleSelect(value) {
    //   //return _.chain(value).filter({type: 'free'}).value();
    //   const newValue = _.map(value, item => {
    //       if(item.type === 'free') {
            
    //         return true;
    //       }else {
    //         return false;
            
    //       }
    //   });
    //   return newValue;
    // },
    copyText () {
      let textToCopy = this.$refs.textToCopy.$el.querySelector('input')
      textToCopy.select()
      document.execCommand("copy");
    },
    get_bitss_single_value(value1) {
      const concatArray = _.concat(value1);
      const newCompanyName = this.companyName;
      const uniqType = _.chain(concatArray).map("subCategory").flatten().value();
      return newCompanyName + '.' + uniqType;
    },
    get_type(value1) {
      const concatArray = _.concat(value1);
      const uniqType = _.chain(concatArray).map("type").flatten().value();
      return uniqType;
    },
    filter_subCategory_taken ( value1, value2, value3, value4, value5) {
      const newCompanyName = this.companyName;
      const takenSubCatArray = this.userApi;
      const uniqTakenSubCatArray = _.uniqBy(takenSubCatArray, 'subCategory');
      
      const concatArray = _.concat(value1, value2, value3, value4, value5);
      const uniqArrayPackage = _.uniqBy(concatArray, 'subCategory');
      const userSubCat = _.chain(uniqTakenSubCatArray).map("subCategories").flatten().value();
      const pickSubCategories = _.map(uniqArrayPackage, item => {
        
        if (item) {

          return {
            subCategory: newCompanyName + '.' + item.subCategory
          }
        }
      });
      // console.log(uniqTakenSubCatArray);
      
      const checkIftaken = _.map(userSubCat, function (item) {
        
        if (item) {
          // if (item.subCategory === pickSubCategories.subCategory) {
            return {
              subCategory: item.subCategory
            }
          // }
        }
        
      });

      let showSubCategoryPick = _.chain(pickSubCategories).map("subCategory").flatten().value();
      let showSubCategoryTaken = _.chain(checkIftaken).map("subCategory").flatten().value();
      
      // console.log('pick:' + showSubCategoryPick + 'taken: ' + showSubCategoryTaken);
      // return _.isEqual(pickSubCategories, checkIftaken);
      return _.isEqual(showSubCategoryPick, showSubCategoryPick);
    },
    filtered_total_cost ( value1, value2, value3, value4, value5) {
      const flatArray = _.flatten([value1, value2]);
      const flatArrayPackage = _.flatten([value3, value4, value5]);
      const concatArray = _.concat(value1, value2);
      const concatArrayPackage = _.concat(value3, value4, value5);
      const uniqArray = _.uniqBy(concatArray, 'subCategory');
      const uniqArrayPackage = _.uniqBy(concatArrayPackage, 'totalPrice');

      const chosenPlan = this.planTypes;
      
      const totalPriceArray = _.map(uniqArrayPackage, item => {
        
        if (item) {
          
          // if (chosenPlan === 'planType3Months') {
          //   return {
          //     price: item.totalPrice - (item.totalPrice * 0.1)
          //   }
            
          // } else if (chosenPlan === 'planType6Months') {
          //   return {
          //     price: item.totalPrice - (item.totalPrice * 0.25)
          //   }
          // } else if (chosenPlan === 'planType12Months') {
          //   return {
          //     price: item.totalPrice - (item.totalPrice * 0.50)
          //   }
          // } else {
          //   return {
          //     price: item.totalPrice
          //   }
          // }
          if (chosenPlan === 'planType3Months') {
            return {
              price: item.priceType3Months
            }
            
          } else if (chosenPlan === 'planType6Months') {
            return {
              price: item.priceType6Months
            }
          } else if (chosenPlan === 'planType12Months') {
            return {
              price: item.priceType12Months
            }
          } else {
            return {
              price: item.priceTypeMonths
            }
          }
          
        }
      });
      const singlePriceArray = _.map(uniqArray, item => {
        console.log(item)
        if (item) {
          
          
          if (chosenPlan === 'planType3Months') {
            return {
              price: item.priceType3Months
            }
            
          } else if (chosenPlan === 'planType6Months') {
            return {
              price: item.priceType6Months
            }
          } else if (chosenPlan === 'planType12Months') {
            return {
              price: item.priceType12Months
            }
          } else {
            return {
              price: item.price
            }
          }
          
        }
      });
      
      const uniqArrayTotal = _.flatten([totalPriceArray, singlePriceArray]);

      
      const totalCost = _.sumBy(uniqArrayTotal, function (cost) {
        if(cost) {
          return cost.price;
        }
        
      });
      return totalCost;
    },
    filtered_table_merged( value1, value2, value3, value4, value5) {
      
      const newCompanyName = this.companyName;
      
      const flatArray = _.flatten([value1, value2, value3, value4, value5]);
      const concatArray = _.concat(value1, value2, value3, value4, value5);
      const uniqArray = _.uniqBy(concatArray, 'subCategory');

      const mergedItem = _.map(uniqArray, item => {
        
        if (item) {

          return {
            subCategory: newCompanyName + '.' + item.subCategory,
            price: item.price,
            status: item.active,
            type: item.type,
          }
        }
      });
      
        
      return mergedItem;
      
      // const type_table_merged = _.flattenDeep(value1, value2, value3,  value4, value5);
      // return type_table_merged;
      
      
    },
    initialize() {
      this.api = [
        {category: "Sale", 
          subCategories: [
            { subCategory: 'today.sale', price: 0, type: 'free', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'sunday.sale', price: 40.00, type: 'premium', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 40, priceType3Months: 36, priceType6Months: 25, priceType12Months: 20,},
            { subCategory: 'friday.sale', price: 80.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 80, priceType3Months: 72, priceType6Months: 60, priceType12Months: 40,},
            { subCategory: 'monday.sale', price: 0, type: 'free', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'special.sale', price: 50.00, type: 'premium', active: false, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'anniv.sale', price: 70.00, type: 'premium', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
            { subCategory: 'tuesday.sale', price: 70.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
          ],
          totalPrice: 30.00,
          priceTypeMonths: 30.00, 
          priceType3Months: 27.00, 
          priceType6Months: 22.5, 
          priceType12Months: 15.00,
          dir: '/bitss',
          path: '/sale',
          slug: 'sale'
        },
        {category: "Promo", 
          subCategories: [
            { subCategory: 'todays.promo', price: 0, type: 'free', active: true, is_package: false, expire: '120', planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'now.promo', price: 30.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'anniv.promo', price: 60.00, type: 'premium', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
            { subCategory: 'manila-sale.promo', price: 80.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
          ],
          totalPrice: 20.00,
          priceTypeMonths: 20.00, 
          priceType3Months: 18.00, 
          priceType6Months: 15.00, 
          priceType12Months: 10.00,
          dir: '/bitss',
          path: '/promo',
          slug: 'promo'
        },
        {category: "Today", 
          subCategories: [
            { subCategory: 'reserve.today', price: 0, type: 'free', active: false, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'sign-up.today', price: 80.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'promo.today', price: 90.00, type: 'premium', active: false, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
            { subCategory: 'discount.today', price: 90.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
          ],
          totalPrice: 10.00,
          priceTypeMonths: 0.00, 
          priceType3Months: 9.00, 
          priceType6Months: 7.50, 
          priceType12Months: 5.00,
          dir: '/bitss',
          path: '/today',
          slug: 'today'
        },
        {category: "For Rent", 
          subCategories: [
            { subCategory: 'reserve.forRent.com', price: 0, type: 'free', active: true, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'sign-up.forRent.com', price: 80.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
            { subCategory: 'promo.forRent.com', price: 90.00, type: 'premium', active: false, is_package: false, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,}, 
            { subCategory: 'discount.forRent.com', price: 90.00, type: 'premium', active: true, is_package: true, planTypeMonths: 30, planType3Months: 90, planType6Months: 270, planType12Months: 365, priceTypeMonths: 0, priceType3Months: 0, priceType6Months: 0, priceType12Months: 0,},
          ],
          totalPrice: 10,
          priceTypeMonths: 0.00, 
          priceType3Months: 9.00, 
          priceType6Months: 7.50, 
          priceType12Months: 5.00,
          domainName: 'forrent.com',
          dir: '/forrent',
          path: '/forrent',
          slug: 'forrent',
          contractExpiry: '1',
          domainExpiry: '3',
          ownerName: '',
          dnsAccess: true,
        },
      ];
      this.userApi = [
        {
          userName: 'Dell',
          userLastName: 'Biden',
          userId: 1,
          subCategories: [
            { subCategory: 'dell.today.sale', price: 0, type: 'premium', active: true, is_package: false, expire: 90},
            { subCategory: 'dell.maunday.sale', price: 0, type: 'free', active: true, is_package: false, expire: 30},
          ]
        }
      ];
    },
    onButtonClick(item, itemSelected) {
      this.indexItem = this.api.indexOf(item);
      this.reservedItem =  item;
      console.log('mangoes: '+ itemSelected);
    }

  },
  computed: {
    company_name: {
        get(){
            //perform your logic
            return this.companyName
        },
        set(newValue){
            this.companyName = newValue;
        }

    },
    filtered_category () {
      const newApi = this.api;
      const subCategoriesList = _(newApi).map(newApiGroup => {
        // const activeBitss = _.filter(newApi.subCategories, 'active');
        const category =  newApiGroup.category;
        
        const totalPrice = newApiGroup.totalPrice;
        const priceTypeMonths = newApiGroup.priceTypeMonths;
        const priceType3Months = newApiGroup.priceType3Months;
        const priceType6Months = newApiGroup.priceType6Months;
        const priceType12Months = newApiGroup.priceType12Months;
        // const inActiveSubCategoriesDefault = _.filter(newApiGroup.subCategories, function(item){
        //   const subCatListActive =  item.active === true;
          
        //   return {
        //     subCategory: item.subCategory,
        //   }
        // });
        const activeBitss = _.filter(newApiGroup.subCategories, 'active');
        const packageBitss = _.filter(activeBitss, 'is_package');
        const subCategories = _.map(packageBitss, item => {
          
          return {
            subCategory: item.subCategory,
            status: item.active,
            price: item.price,
            totalPrice: totalPrice,
            priceTypeMonths,
            priceType3Months,
            priceType6Months,
            priceType12Months,
            type: item.type,
            is_package: item.is_package,
          }
        });
        
        return {
          category,
          totalPrice,
          priceTypeMonths,
          priceType3Months,
          priceType6Months,
          priceType12Months,
          subCategories
        }
        
      }).value();
      return subCategoriesList;
    },
    filtered_type() {
      // return _.chain(this.api).map("subCategories").flatten().value(type);
      let map_subCategories = _.chain(this.api).map("subCategories").flatten().value();
      return _.chain(map_subCategories).map("type").uniq().flatten().value();
      // return _.mapValues(this.api, 'category');
    },
     filtered_type_data() {
      // return _.chain(this.api).map("subCategories").flatten().value(type);
      let map_category =  _.chain(this.api).map("category").flatten().value();
      let map_subCategories = _.chain(this.api).map("subCategories").flatten().value();
      let map_type =  _.chain(map_subCategories).map("type").uniq().flatten().value();
      

      // let filter_category_data = _.chain(this.api).map("subCategories").flatten().filter({type: 'free', active: true}).value();
      let filter_category_data = _.find(this.api, function(category) {
        return category.category === 'Promo';
      });
      
      return filter_category_data;
    },
    filtered_type_free() {
      return _.chain(this.api).map("subCategories").flatten().filter({type: 'free', active: true}).value();
    },
    filtered_type_premium() {
      return _.chain(this.api).map("subCategories").flatten().filter({type: 'premium', active: true}).value();
    },
    filtered_subCategories_active() {
      return _.chain(this.api).map("subCategories").flatten().value();
    },
    filtered_type_value() {

      // const newCompanyName = this.companyName;
      const newApi = this.api;
      const subCatList = _.chain(newApi).map("subCategories").flatten().value();
      const subCategoriesList = _(subCatList).groupBy('type').map(typeGrouping => {
        const firstTypeGrouping = _.nth(typeGrouping, 0);
        const type = firstTypeGrouping.type;
        const subCategories = firstTypeGrouping.subCategory;
        const price = firstTypeGrouping.price;
        const priceTypeMonths = firstTypeGrouping.priceTypeMonths;
        const priceType3Months = firstTypeGrouping.priceType3Months;
        const priceType6Months = firstTypeGrouping.priceType6Months;
        const priceType12Months = firstTypeGrouping.priceType12Months;
        const activeBitss = _.filter(typeGrouping, 'active');
        const typeData = _.map(activeBitss, typeList => {
          return {
            subCategory: typeList.subCategory,
            price: typeList.price,
            priceTypeMonths: priceTypeMonths,
            priceType3Months: priceType3Months,
            priceType6Months: priceType6Months,
            priceType12Months: priceType12Months,
            status: typeList.active,
            type: typeList.type,
          }
        });
        return {
          type,
          typeData,
        }
      }).value();
      const activeSubCat = _.filter(subCategoriesList, 'status');  
      return subCategoriesList;
    }
  },
}
</script>
<style>
.child-table tbody .v-data-table__checkbox {
  display: none;
}
</style>